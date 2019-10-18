using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using weatherapp_API.Models;

namespace weatherapp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherHistoryController : ControllerBase
    {
        private readonly WeatherAppContext _context;
        public WeatherHistoryController(WeatherAppContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<WeatherHistory>>> GetAddresses()
        {
            var items = await _context.WeatherHistories.AsQueryable().ToListAsync();
            if (items == null)
            {
                return NotFound();
            }
            return items;
        }
    }
}