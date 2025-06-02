using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.MessageDTOs;
using ArticleEvaluationSystem.Application.Services;
using ArticleEvaluationSystem.Domain.Entities;
using ArticleEvaluationSystem.Persistence.DbContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ArticleEvaluationSystem.Persistence.Services
{
    public class MessageService : IMessageService
    {
        private readonly ArticleDbContext _context;
        private readonly IMapper _mapper;

        public MessageService(ArticleDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreateMessageAsync(CreateMessageDto createMessageDto)
        {
            var value = _mapper.Map<Message>(createMessageDto);
            value.Read = false;
            await _context.Messages.AddAsync(value);
            await _context.SaveChangesAsync();
        }
       

        public async Task<List<ResultMessageDto>> GetAllMessagesAsync()
        {
            var values = await _context.Messages.ToListAsync();
            return _mapper.Map<List<ResultMessageDto>>(values);

        }

        public async Task<List<ResultMessageDto>> GetUnreadMessagesAsync()
        {
            var values = await _context.Messages.Where(x => x.Read == false).ToListAsync();
            return _mapper.Map<List<ResultMessageDto>>(values);
        }

        public async Task MessageReadAsync(int id)
        {
            var value = await _context.Messages.FindAsync(id);
            value.Read = true;
            await _context.SaveChangesAsync();

        }
    }
}
