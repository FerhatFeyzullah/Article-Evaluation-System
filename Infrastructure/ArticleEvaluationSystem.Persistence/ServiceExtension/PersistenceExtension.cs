using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.Services;
using ArticleEvaluationSystem.Persistence.Configurations;
using ArticleEvaluationSystem.Persistence.Mapping.AppUserMapping;
using ArticleEvaluationSystem.Persistence.Mapping.ArticleMapping;
using ArticleEvaluationSystem.Persistence.Mapping.LogMapping;
using ArticleEvaluationSystem.Persistence.Mapping.MessageMapping;
using ArticleEvaluationSystem.Persistence.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ArticleEvaluationSystem.Persistence.ServiceExtension
{
    public static class PersistenceExtension
    {
        public static void AddPersistenceExtension(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IArticleService, ArticleService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<ILogService, LogService>();

            services.AddScoped<IJwtService, JwtService>();

            services.Configure<JwtTokenOptions>(configuration.GetSection("TokenOptions"));

            services.AddAutoMapper(
                typeof(ArticleMapping),
                typeof(AppUserMapping),
                typeof(MessageMapping),           
                typeof(LogMapping)
                );
            

        }
    }
}
