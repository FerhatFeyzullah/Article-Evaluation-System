using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArticleEvaluationSystem.Application.DTOs.MessageDTOs
{
    public class ResultMessageDto
    {
        public int MessageId { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string Email { get; set; }
        public bool Read { get; set; }

    }
}
