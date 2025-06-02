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
        public async Task<IActionResult> GetArticleByIdAndWriter(string fileName, string email) 
        {
            var value = await _articleService.GetArticleByIdAndWriter(fileName, email);
            if (value == null)
            {
                return NotFound("Makale bulunamadi.");
            }
            return Ok(value);

        }
        [HttpPut("AssignJudgeToArticle")]
        public async Task<IActionResult> AssignJudgeToArticle(int articleId, int judgeId) 
        {
            await _articleService.AssignJudgeToArticle(articleId, judgeId);
            return Ok("Hakem atama islemi basarili.");
        }
        [HttpPut("UpdateArticleStatus")]
        public async Task<IActionResult> UpdateArticleStatus(int articleId, bool status, string reasonForEditing)
        {
            await _articleService.UpdateArticleStatus(articleId, status, reasonForEditing);
            return Ok("Makale durumu guncellendi.");
        }
    }
}
