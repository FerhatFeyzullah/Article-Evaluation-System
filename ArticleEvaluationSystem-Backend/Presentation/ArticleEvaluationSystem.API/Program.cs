using ArticleEvaluationSystem.Domain.Entities;
using ArticleEvaluationSystem.Persistence.DbContext;
using ArticleEvaluationSystem.Persistence.ServiceExtension;
using ArticleEvaluationSystem.Infrastructure.ServiceExtension;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using AutoMapper;
using ArticleEvaluationSystem.Persistence.Configurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;




var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddPersistenceExtension(builder.Configuration);
builder.Services.AddInfrastructureExtension(); 

builder.Services.AddDbContext<ArticleDbContext>(options => 
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlConnection"));
});
    

builder.Services.AddIdentity<AppUser,AppRole>().AddEntityFrameworkStores<ArticleDbContext>();

var tokenOptions = builder.Configuration.GetSection("TokenOptions").Get<JwtTokenOptions>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
{
    options.RequireHttpsMetadata = false;
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            // Eðer Authorization header yoksa ? Cookie'den token al
            if (string.IsNullOrEmpty(context.Token) && context.Request.Cookies.ContainsKey("MyAuthCookie"))
            {
                context.Token = context.Request.Cookies["MyAuthCookie"];
            }

            return Task.CompletedTask;
        }
    };
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = tokenOptions.Issuer,
        ValidAudience = tokenOptions.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenOptions.Key)),
        ClockSkew = TimeSpan.Zero,
        NameClaimType = "name",

    };
});

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true; // Tarayýcýdan JavaScript ile eriþilemesin
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest; 
    options.Cookie.SameSite = SameSiteMode.Lax; // veya Strict / None
    options.Cookie.Name = "JWT"; // Ýsteðe baðlý
    options.LoginPath = "/girisyap"; // Giriþ yapýlmadýðýnda yönlendirilecek yer
    options.AccessDeniedPath = "/girisyap"; // Yetki yoksa yönlendirilecek yer
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60); // Cookie ömrü
    options.SlidingExpiration = true; // Süre dolmadan aktifse uzat
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost5173",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowLocalhost5173");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
