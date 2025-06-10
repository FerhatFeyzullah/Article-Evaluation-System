using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.ArticleDTOs;
using ArticleEvaluationSystem.Application.Services;
using ArticleEvaluationSystem.Domain.Entities;
using ArticleEvaluationSystem.Persistence.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ArticleEvaluationSystem.Persistence.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IFileStorageService _fileStorageService;
        public readonly ArticleDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogService _logService;

        public ArticleService(IFileStorageService fileStorageService, ArticleDbContext context, IMapper mapper, ILogService logService)
        {
            _fileStorageService = fileStorageService;
            _context = context;
            _mapper = mapper;
            _logService = logService;
        }

        public async Task<string> UploadArticle(CreateArticleDto createArticleDto)
        {
            var fileResult = await _fileStorageService.SavePdfAsync(createArticleDto.PDF);

            

            var name = createArticleDto.PDF.FileName;

            var article = new Article
            {
                Title = createArticleDto.Title,
                WriterEmail = createArticleDto.WriterEmail,
                FilePath = fileResult.filePath,
                FileName = fileResult.fileName,
                JudgeStatus = false,

            };

            _context.Articles.Add(article);
            await _context.SaveChangesAsync();
            await _logService.CreateLogAsync($"Yeni bir makale yüklendi. Makale Id: {article.ArticleId} Makale Başlığı: {article.Title}", createArticleDto.WriterEmail, $"Pdf Takip Numarası: {article.FileName}");
            return article.FileName;
        }


        public async Task<ResultArticleDto> GetArticleByIdAndWriter(string fileName, string email)
        {
            var value = await _context.Articles.Include(x => x.Judge).FirstOrDefaultAsync(x => x.FileName==fileName && x.WriterEmail == email);
            return _mapper.Map<ResultArticleDto>(value);
        }

        public async Task AssignJudgeToArticle(int articleId, int judgeId)
        {
            var value = await _context.Articles.FirstOrDefaultAsync(x => x.ArticleId == articleId);

            if (value == null)
                throw new Exception("Makale bulunamadı.");

            value.JudgeId = judgeId;
            value.JudgeStatus = true;
            _context.Articles.Update(value);
            await _context.SaveChangesAsync();
            await _logService.CreateLogAsync($"Makale {articleId} için hakem atandı.", value.WriterEmail);
        }

        public async Task UpdateArticleStatus(int articleId, bool status, string reasonForEditing)
        {
            var value = await _context.Articles.FirstOrDefaultAsync(x => x.ArticleId == articleId);

            if (value == null)
                throw new Exception("Makale bulunamadı.");

            value.ArticleStatus = status;
            value.ReasonForEditing = reasonForEditing;
            _context.Articles.Update(value);
            await _context.SaveChangesAsync();
            await _logService.CreateLogAsync(
                $"Makale {articleId} durumu güncellendi.",
                value.WriterEmail,
                $" Yeni durum: {(status ? "Kabul Edildi" : "Reddedildi")}. Gerekçe: {reasonForEditing}");
            
        }

        public async Task<List<ResultArticleDto>> GetAllArticles()
        {
            var values = await _context.Articles.Include(x => x.Judge).OrderByDescending(x=>x.ArticleId).ToListAsync();
            return _mapper.Map<List<ResultArticleDto>>(values);
        }

        public async Task<ResultArticleDto> GetArticleById(int articleId)
        {
            var value = await _context.Articles.Include(x => x.Judge).FirstOrDefaultAsync(x => x.ArticleId == articleId);
            return _mapper.Map<ResultArticleDto>(value);
        }

        public async Task<List<ResultArticleDto>> GetArticleByJudgeId(int judgeId)
        {
            var values = await _context.Articles.Where(x=>x.JudgeId==judgeId).OrderByDescending(x => x.ArticleId).ToListAsync();
            return _mapper.Map<List<ResultArticleDto>>(values);
        }
    }
}
