using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ArticleEvaluationSystem.Application.Services
{
    public interface IFileStorageService
    {
        Task<(string filePath, string fileName)> SavePdfAsync(IFormFile pdf);
    }
}
