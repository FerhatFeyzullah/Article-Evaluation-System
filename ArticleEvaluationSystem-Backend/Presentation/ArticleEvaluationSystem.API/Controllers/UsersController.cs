using ArticleEvaluationSystem.Application.Services;
using ArticleEvaluationSystem.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ArticleEvaluationSystem.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserService _userService) : ControllerBase
    {
        
        [HttpGet("GetAllJudges")]
        public async Task<IActionResult> GetAllJudges() 
        {
            var values = await _userService.GetAllJudges();

            return Ok(values);
        }
    }
}
