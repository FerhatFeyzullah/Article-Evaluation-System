using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArticleEvaluationSystem.Domain.Entities
{
    public class Log
    {
        public int LogId { get; set; }
        public string Event { get; set; }         
        public string? UserEmail { get; set; }    
        public DateTime CreatedAt { get; set; }   
        public string? ExtraData { get; set; }
    }
}
