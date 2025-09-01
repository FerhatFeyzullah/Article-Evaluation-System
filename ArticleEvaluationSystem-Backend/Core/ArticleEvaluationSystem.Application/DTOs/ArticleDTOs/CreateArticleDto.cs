using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ArticleEvaluationSystem.Application.DTOs.ArticleDTOs
{
    public class CreateArticleDto
    {
        public string Title { get; set; }      
        public string WriterEmail { get; set; }
        public IFormFile PDF { get; set; }
    }
}
