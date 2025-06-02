using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArticleEvaluationSystem.Domain.Entities
{
    public class Article
    {
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public bool JudgeStatus { get; set; } = false;



        public string WriterEmail { get; set; }




        public int? JudgeId { get; set; }
        public AppUser? Judge { get; set; }

        public bool? ArticleStatus { get; set; }
        public string? ReasonForEditing { get; set; }

    }
}
