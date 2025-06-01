using ArticleEvaluationSystem.Domain.Entities;
using ArticleEvaluationSystem.Persistence.DbContext;
using ArticleEvaluationSystem.Persistence.ServiceExtension;
using ArticleEvaluationSystem.Infrastructure.ServiceExtension;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using ArticleEvaluationSystem.Persistence.Mapping.ArticleMapping;
using AutoMapper;
using ArticleEvaluationSystem.Persistence.Mapping.AppUserMapping;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddPersistenceExtencion();
builder.Services.AddInfrastructureExtension(); 

builder.Services.AddAutoMapper(typeof(ResultArticleDtoMapping));
builder.Services.AddAutoMapper(typeof(ResultAppUserDtoMapping));


builder.Services.AddDbContext<ArticleDbContext>(options => 
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlConnection"));
});
    

builder.Services.AddIdentity<AppUser,AppRole>().AddEntityFrameworkStores<ArticleDbContext>();
    

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
