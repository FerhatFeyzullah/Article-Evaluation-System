using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.Services;
using ArticleEvaluationSystem.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace ArticleEvaluationSystem.Infrastructure.ServiceExtension
{
    public static class InfrastructureExtension
    {
        public static void AddInfrastructureExtension(this IServiceCollection services)
        {
            services.AddScoped<IFileStorageService, FileStorageService>();
            
        }
    }
}
