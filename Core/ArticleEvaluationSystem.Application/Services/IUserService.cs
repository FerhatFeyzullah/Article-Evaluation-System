using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.AppUserDTOs;
using ArticleEvaluationSystem.Application.DTOs.UserDTOs;
using Microsoft.AspNetCore.Identity;

namespace ArticleEvaluationSystem.Application.Services
{
    public interface IUserService
    {
        Task<IdentityResult> CreateUserAsync(UserRegisterDto userRegisterDto);

        Task<string?> LoginAsync(UserLoginDto userLoginDto);

        Task LogoutAsync();

        Task<List<ResultAppUserDto>> GetAllJudges();
    }
}
