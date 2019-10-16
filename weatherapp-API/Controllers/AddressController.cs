using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using weatherapp_API.Models;

namespace weatherapp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly WeatherAppContext _context;
        public AddressController(WeatherAppContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateAddress(Address address)
        {
            if (address == null)
            {
                throw new Exception("Address is empty!");
            }
            _context.Addresses.Add(address);
            var result = await _context.SaveChangesAsync();
            return (result > 0) ? address.Id : 0;

            throw new Exception("Problem Saving Changes");
        }

        [HttpGet]
        public async Task<ActionResult<List<Address>>> GetAddresses()
        {
            var items = await _context.Addresses.AsQueryable().ToListAsync();
            if (items == null)
            {
                return NotFound();
            }
            return items;
        }
    }
}