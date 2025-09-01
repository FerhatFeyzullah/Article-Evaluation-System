using ArticleEvaluationSystem.Application.DTOs.ArticleDTOs;
using ArticleEvaluationSystem.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArticleEvaluationSystem.API.Controllers
{
    [Authorize(Roles ="Admin,Judge")]
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController(IArticleService _articleService, IWebHostEnvironment _environment) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("Upload")]
        public async Task<IActionResult> UploadArticle([FromForm] CreateArticleDto createArticleDto)
        {
            var id = await _articleService.UploadArticle(createArticleDto);
            return Ok(id);
        }
        [AllowAnonymous]
        [HttpGet("GetAllArticles")]
        public async Task<IActionResult> GetAllArticles()
        {
            var articles = await _articleService.GetAllArticles();
            if (articles == null || !articles.Any())
            {
                return NotFound("Makale bulunamadı.");
            }
            return Ok(articles);
        }

        [AllowAnonymous]
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

        [HttpGet("GetArticleById{articleId}")]
        public async Task<IActionResult> GetArticleById(int articleId) 
        {
        var value = await _articleService.GetArticleById(articleId);
            if (value == null)
            {
                return NotFound("Makale bulunamadi.");
            }
            return Ok(value);

        }
        [AllowAnonymous]
        [HttpGet("GetArticleByJudgeId/{judgeId}")]
        public async Task<IActionResult> GetArticleByJudgeId(int judgeId) 
        {
            var values = await _articleService.GetArticleByJudgeId(judgeId);
            if (values == null)
            {
                return NotFound("Bu Hakeme Ait Makale Bulunamadi.");
            }
            return Ok(values);
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
        
        [HttpGet("pdfView/{fileName}")]
        public IActionResult GetArticlePdf(string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName) || fileName.Contains(".."))
                return BadRequest("Invalid file name.");

            var filePath = Path.Combine(_environment.WebRootPath, "upload", fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

            //headerlar
            Response.Headers["Content-Type"] = "application/pdf";
            Response.Headers["Content-Disposition"] = $"inline; filename=\"{fileName}\"";
            Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
            Response.Headers["Pragma"] = "no-cache";
            Response.Headers["Expires"] = "0";

            
            return new FileStreamResult(stream, "application/pdf");
        }

        [HttpGet("pdfDownload/{fileName}")]
        public IActionResult DownloadArticlePdf(string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName) || fileName.Contains(".."))
                return BadRequest("Invalid file name.");

            var filePath = Path.Combine(_environment.WebRootPath, "upload", fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

            // Burada önemli fark:
            Response.Headers["Content-Type"] = "application/pdf";
            Response.Headers["Content-Disposition"] = $"attachment; filename=\"{fileName}\"";
            Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
            Response.Headers["Pragma"] = "no-cache";
            Response.Headers["Expires"] = "0";

            return new FileStreamResult(stream, "application/pdf");
        }



    }
}
