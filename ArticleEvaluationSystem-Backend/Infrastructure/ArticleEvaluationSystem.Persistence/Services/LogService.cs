using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.LogDTOs;
using ArticleEvaluationSystem.Application.Services;
using ArticleEvaluationSystem.Domain.Entities;
using ArticleEvaluationSystem.Persistence.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ArticleEvaluationSystem.Persistence.Services
{
    public class LogService : ILogService
    {
        private readonly ArticleDbContext _context;
        private readonly IMapper _mapper;

        public LogService(ArticleDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateLogAsync(string eventName, string? userEmail = null, string? extraData = null)
        {
            var log = new Log
            {
                Event = eventName,
                UserEmail = userEmail,
                CreatedAt = DateTime.Now,
                ExtraData = extraData
            };

            await _context.Logs.AddAsync(log);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ResultLogDto>> GetAllLogsAsync()
        {
            var values = await _context.Logs.OrderByDescending(x=>x.CreatedAt).ToListAsync();
            return _mapper.Map<List<ResultLogDto>>(values);
        }
    }
}
