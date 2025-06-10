using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.DTOs.MessageDTOs;

namespace ArticleEvaluationSystem.Application.Services
{
    public interface IMessageService
    {
        Task CreateMessageAsync(CreateMessageDto createMessageDto);

        Task<List<ResultMessageDto>> GetAllMessagesAsync();

        Task<int> GetUnreadMessagesCountAsync();

        Task MessageReadAsync(int id);

    }
}
