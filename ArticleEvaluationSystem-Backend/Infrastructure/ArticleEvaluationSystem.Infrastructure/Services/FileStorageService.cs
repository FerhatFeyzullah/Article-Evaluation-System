using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ArticleEvaluationSystem.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;




namespace ArticleEvaluationSystem.Infrastructure.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly IWebHostEnvironment _environment;

        public FileStorageService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<(string filePath, string fileName)> SavePdfAsync(IFormFile pdf)
        {
            var uploadFolder = Path.Combine(_environment.WebRootPath, "upload");

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(pdf.FileName);
            var filePath = Path.Combine(uploadFolder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await pdf.CopyToAsync(stream);

            return (filePath.Replace("\\", "/"), fileName);
        }

    }
}
