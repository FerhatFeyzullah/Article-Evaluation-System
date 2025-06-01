using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.Services;
using ArticleEvaluationSystem.Persistence.Services;
using Microsoft.Extensions.DependencyInjection;

namespace ArticleEvaluationSystem.Persistence.ServiceExtension
{
    public static class PersistenceExtension
    {
        public static void AddPersistenceExtencion(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IArticleService, ArticleService>();
        }
    }
}
