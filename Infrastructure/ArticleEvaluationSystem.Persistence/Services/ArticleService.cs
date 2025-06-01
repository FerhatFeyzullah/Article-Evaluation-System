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

        public ArticleService(IFileStorageService fileStorageService, ArticleDbContext context, IMapper mapper)
        {
            _fileStorageService = fileStorageService;
            _context = context;
            _mapper = mapper;
        }

        public async Task<int> UploadArticle(CreateArticleDto createArticleDto)
        {

            var filePath = await _fileStorageService.SavePdfAsync(createArticleDto.PDF);

            var article = new Article
            {
                Title = createArticleDto.Title,
                WriterEmail = createArticleDto.WriterEmail,
                DosyaYolu = filePath,
                JudgeStatus = false,

            };

            _context.Articles.Add(article);
            await _context.SaveChangesAsync();
            return article.ArticleId;
        }


        public async Task<ResultArticleDto> GetArticleByIdAndWriter(int id, string email)
        {
            var value = await _context.Articles.Include(x => x.Judge).FirstOrDefaultAsync(x => x.ArticleId == id && x.WriterEmail == email);
            return _mapper.Map<ResultArticleDto>(value);
        }
    }
}
