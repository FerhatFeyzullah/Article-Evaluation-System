using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.AppUserDTOs;
using ArticleEvaluationSystem.Domain.Entities;
using AutoMapper;

namespace ArticleEvaluationSystem.Persistence.Mapping.AppUserMapping
{
    public class ResultAppUserDtoMapping:Profile
    {
        public ResultAppUserDtoMapping()
        {
            CreateMap<AppUser, ResultAppUserDto>().ReverseMap();
        }
    }
}
