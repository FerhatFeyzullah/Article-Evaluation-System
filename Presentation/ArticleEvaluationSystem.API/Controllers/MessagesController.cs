using ArticleEvaluationSystem.Application.DTOs.MessageDTOs;
using ArticleEvaluationSystem.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArticleEvaluationSystem.API.Controllers
{
    [Authorize(Roles = "Admin")]
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

        [AllowAnonymous]
        [HttpPost("Create")]
        public async Task<IActionResult> CreateMessage([FromBody] CreateMessageDto createMessageDto)
        {
            await _messageService.CreateMessageAsync(createMessageDto);
            return Ok("Message created successfully.");
        }

        [HttpGet("GetUnreadMessagesCount")]
        public async Task<IActionResult> GetUnreadMessagesCount()
        {
            var value = await _messageService.GetUnreadMessagesCountAsync();
            return Ok(value);
        }
        [HttpPut("MessageRead/{id}")]
        public async Task<IActionResult> MessageRead(int id)
        {
            await _messageService.MessageReadAsync(id);
            return Ok("Message marked as read.");
        }
    }
}
