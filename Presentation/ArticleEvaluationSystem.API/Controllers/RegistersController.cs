using ArticleEvaluationSystem.Application.DTOs.UserDTOs;
using ArticleEvaluationSystem.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArticleEvaluationSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistersController(IUserService _userService, IJwtService _jwtService) : ControllerBase
    {
        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegisterDto userRegisterDto)
        {
            var result = await _userService.CreateUserAsync(userRegisterDto);
            if (result.Succeeded)
            {
                return Ok(new { message = "User registered successfully." });
            }
            else
            {
                return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
            }
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto) 
        {
            var token = await _userService.LoginAsync(userLoginDto);
            if (token == null)
            {
                return BadRequest(new { message = "Email veya şifre hatalı." });
            }

            return Ok(new { token });

        }
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _userService.LogoutAsync();
            return Ok(new { message = "Logout successful." });
        }
    }
}
