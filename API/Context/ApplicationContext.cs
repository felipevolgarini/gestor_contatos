using GestorContatos.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestorContatos.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Pessoa> Pessoa { get; set; }
        public DbSet<PessoaTelefone> PessoaTelefone { get; set; }

        public ApplicationContext()
        {
        }

        public ApplicationContext(DbContextOptions options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = Startup.StaticConfig.GetConnectionString("Default");
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
