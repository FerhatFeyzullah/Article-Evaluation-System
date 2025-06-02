using ArticleEvaluationSystem.Application.DTOs.MessageDTOs;
using ArticleEvaluationSystem.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArticleEvaluationSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController(IMessageService _messageService) : ControllerBase
    {
        [HttpGet("GetAllMessages")]
        public async Task<IActionResult> GetAllMessages()
        {
            var values = await _messageService.GetAllMessagesAsync();
            return Ok(values);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage([FromBody] CreateMessageDto createMessageDto)
        {
            await _messageService.CreateMessageAsync(createMessageDto);
            return Ok("Message created successfully.");
        }

        [HttpGet("GetUnreadMessages")]
        public async Task<IActionResult> GetUnreadMessages()
        {
            var values = await _messageService.GetUnreadMessagesAsync();
            return Ok(values);
        }
        [HttpPut("MessageRead/{id}")]
        public async Task<IActionResult> MessageRead(int id)
        {
            await _messageService.MessageReadAsync(id);
            return Ok("Message marked as read.");
        }
    }
}
