using ArticleEvaluationSystem.Application.DTOs.UserDTOs;
using ArticleEvaluationSystem.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArticleEvaluationSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistersController(IUserService _userService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> SignUp(UserRegisterDto userRegisterDto)
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
    }
}
