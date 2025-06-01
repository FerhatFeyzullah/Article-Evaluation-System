using ArticleEvaluationSystem.Application.DTOs.ArticleDTOs;
using ArticleEvaluationSystem.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArticleEvaluationSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController(IArticleService _articleService) : ControllerBase
    {
        [HttpPost("Upload")]
        public async Task<IActionResult> UploadArticle([FromForm] CreateArticleDto createArticleDto)
        {
            var id = await _articleService.UploadArticle(createArticleDto);
            return Ok("Pdf Yukleme basarili,id :" + id);
        }
        [HttpGet("GetArticleByIdAndWriter")]
        public async Task<IActionResult> GetArticleByIdAndWriter(int id, string email) 
        {
            var value = await _articleService.GetArticleByIdAndWriter(id, email);
            if (value == null)
            {
                return NotFound("Makale bulunamadi.");
            }
            return Ok(value);

        }
    }
}
