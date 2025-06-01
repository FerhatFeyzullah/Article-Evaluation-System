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
    public class ResultArticleDtoMapping:Profile
    {
        public ResultArticleDtoMapping()
        {
            CreateMap<Article, ResultArticleDto>().ReverseMap();
        }
    }
}
