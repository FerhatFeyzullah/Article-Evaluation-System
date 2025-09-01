using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.ArticleDTOs;
using ArticleEvaluationSystem.Domain.Entities;

namespace ArticleEvaluationSystem.Application.Services
{
    public interface IArticleService
    {
        Task<string> UploadArticle(CreateArticleDto createArticleDto);

        Task<ResultArticleDto> GetArticleByIdAndWriter(string fileName, string email);

        Task<List<ResultArticleDto>> GetAllArticles();

        Task<ResultArticleDto> GetArticleById(int articleId);

        Task AssignJudgeToArticle(int articleId, int judgeId);

        Task UpdateArticleStatus(int articleId, bool status, string reasonForEditing);

        Task<List<ResultArticleDto>> GetArticleByJudgeId(int judgeId); 
    }
}
