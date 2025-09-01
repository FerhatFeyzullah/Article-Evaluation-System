using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.LogDTOs;

namespace ArticleEvaluationSystem.Application.Services
{
    public interface ILogService
    {
        Task CreateLogAsync(string eventName, string?userEmail = null, string? extraData = null);
        Task<List<ResultLogDto>> GetAllLogsAsync();
    }
}
