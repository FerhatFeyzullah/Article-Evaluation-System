using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ArticleEvaluationSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ArticleEvaluationSystem.Persistence.DbContext
{
    public class ArticleDbContext : IdentityDbContext<AppUser,AppRole,int>
    {
        public ArticleDbContext(DbContextOptions options) : base(options)
        {
        }

        

        public DbSet<Article> Articles { get; set; }
        public DbSet<Message> Messages { get; set; }

    }
}
