using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelProject.Models
{
    public class GuestContext : DbContext
    {
        public DbSet<Guest> Hotel { get; set; }
        public GuestContext(DbContextOptions<GuestContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
