using ArticleEvaluationSystem.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArticleEvaluationSystem.API.Controllers
{
    [Authorize(Roles ="Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController(ILogService _logService) : ControllerBase
    {
        [HttpGet("GetAllLogs")]
        public async Task<IActionResult> GetAllLogs() 
        {
            var values = await _logService.GetAllLogsAsync();
            return Ok(values);
        }
    }
}
