using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.AppUserDTOs;

namespace ArticleEvaluationSystem.Application.DTOs.ArticleDTOs
{
    public class ResultArticleDto
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public string DosyaYolu { get; set; }
        public bool JudgeStatus { get; set; } = false;



        public string WriterEmail { get; set; }




        public int? JudgeId { get; set; }
        public ResultAppUserDto? Judge { get; set; }

        public bool? ArticleStatus { get; set; }
        public string? ReasonForEditing { get; set; }
    }
}
