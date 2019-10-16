using Microsoft.EntityFrameworkCore;

namespace weatherapp_API.Models
{
    public class WeatherAppContext : DbContext
    {
        public WeatherAppContext(DbContextOptions<WeatherAppContext> options) : base(options)
        { }
        public DbSet<Address> Addresses { get; set; }
    }
}