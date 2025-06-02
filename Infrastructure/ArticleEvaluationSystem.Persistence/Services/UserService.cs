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
    public class UserService(UserManager<AppUser> _userManager,SignInManager<AppUser> _signManager, IMapper _mapper) : IUserService
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

        public async Task<IdentityResult> LoginAsync(UserLoginDto userLoginDto)
        {
            var user = await _userManager.FindByEmailAsync(userLoginDto.Email);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "Kullanıcı Bulunamadı" });
            }
            var result = await _signManager.PasswordSignInAsync(user, userLoginDto.Password, false, false);
            if (result.Succeeded)
            {
                return IdentityResult.Success;
            }
            else
            {
                return IdentityResult.Failed(new IdentityError { Description = "Hatalı Bilgi Girişi" });
            }
        }

        public async Task LogoutAsync()
        {
            await _signManager.SignOutAsync();
        }
    }
}
