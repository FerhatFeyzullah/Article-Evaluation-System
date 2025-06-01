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
        Task<int> UploadArticle(CreateArticleDto createArticleDto);
        Task<ResultArticleDto> GetArticleByIdAndWriter(int id, string email);
    }
}
