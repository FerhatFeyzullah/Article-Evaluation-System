using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.ArticleDTOs;
using ArticleEvaluationSystem.Domain.Entities;
using AutoMapper;

namespace ArticleEvaluationSystem.Persistence.Mapping.ArticleMapping
{
    public class ArticleMapping:Profile
    {
        public ArticleMapping()
        {
            CreateMap<Article, ResultArticleDto>().ReverseMap();
        }
    }
}
