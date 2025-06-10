using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.LogDTOs;
using ArticleEvaluationSystem.Domain.Entities;
using AutoMapper;

namespace ArticleEvaluationSystem.Persistence.Mapping.LogMapping
{
    public class LogMapping:Profile
    {
        public LogMapping()
        {
            CreateMap<Log, ResultLogDto>().ReverseMap();
        }
    }
}
