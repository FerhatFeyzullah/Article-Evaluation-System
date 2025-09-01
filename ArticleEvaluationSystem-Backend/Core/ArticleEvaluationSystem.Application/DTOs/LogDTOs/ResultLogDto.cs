using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArticleEvaluationSystem.Application.DTOs.LogDTOs
{
    public class ResultLogDto
    {
        public int LogId { get; set; }
        public string Event { get; set; }
        public string? UserEmail { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? ExtraData { get; set; }

    }
}
