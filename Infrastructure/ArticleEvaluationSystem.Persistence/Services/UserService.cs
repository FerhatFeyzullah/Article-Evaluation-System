using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.AppUserDTOs;
using ArticleEvaluationSystem.Application.DTOs.UserDTOs;
using ArticleEvaluationSystem.Application.Services;
using ArticleEvaluationSystem.Domain.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace ArticleEvaluationSystem.Persistence.Services
{
    public class UserService(UserManager<AppUser> _userManager,IMapper _mapper) : IUserService
    {
        public async Task<IdentityResult> CreateUserAsync(UserRegisterDto userRegisterDto)
        {
            var user = new AppUser
            {
                FirstName = userRegisterDto.FirstName,
                LastName = userRegisterDto.LastName,
                UserName = userRegisterDto.UserName,
                Email = userRegisterDto.Email

            };

            
            var result = await _userManager.CreateAsync(user, userRegisterDto.Password);

            if (result.Succeeded) 
            { 
                await _userManager.AddToRoleAsync(user, "Hakem");
                return result;

            }
            return result;

        }

        public async Task<List<ResultAppUserDto>> GetAllJudges()
        {
            var values = await _userManager.GetUsersInRoleAsync("Hakem");
            return  _mapper.Map<List<ResultAppUserDto>>(values);
        }
    }
}
