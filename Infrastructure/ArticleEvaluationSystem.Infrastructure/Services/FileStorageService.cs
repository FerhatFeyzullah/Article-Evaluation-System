using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.Services;
using Microsoft.AspNetCore.Http;

namespace ArticleEvaluationSystem.Infrastructure.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly string _storagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "upload");

        public FileStorageService()
        {
            if (!Directory.Exists(_storagePath)) 
            {
            Directory.CreateDirectory(_storagePath);
            }
        }

        public async Task<string> SavePdfAsync(IFormFile pdf)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(pdf.FileName);
            var filePath = Path.Combine(_storagePath, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await pdf.CopyToAsync(stream);

            return filePath.Replace("\\", "/");
        }
    }
}
