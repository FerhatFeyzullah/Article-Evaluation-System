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
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace ArticleEvaluationSystem.Persistence.Services
{
    public class UserService(UserManager<AppUser> _userManager,SignInManager<AppUser> _signManager, IMapper _mapper,IJwtService _jwtService) : IUserService
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
                await _userManager.AddToRoleAsync(user, "Judge");
                return result;

            }
            return result;

        }

        public async Task<List<ResultAppUserDto>> GetAllJudges()
        {
            var values = await _userManager.GetUsersInRoleAsync("Judge");
            return  _mapper.Map<List<ResultAppUserDto>>(values);
        }

        public async Task<string?> LoginAsync(UserLoginDto userLoginDto)
        {
            var user = await _userManager.FindByEmailAsync(userLoginDto.Email);
            if (user == null)
                return null;

            var result = await _signManager.PasswordSignInAsync(user, userLoginDto.Password, false, false);
            if (!result.Succeeded)
                return null;

            var token = await _jwtService.CreateTokenAsync(user);

            

            return token;
        }

        public async Task LogoutAsync()
        {
            await _signManager.SignOutAsync();

        }
    }
}
