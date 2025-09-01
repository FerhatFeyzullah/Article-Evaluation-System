using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.UserDTOs;
using ArticleEvaluationSystem.Domain.Entities;

namespace ArticleEvaluationSystem.Application.Services
{
    public interface IJwtService
    {
        Task<string> CreateTokenAsync(AppUser user);

    }
}
