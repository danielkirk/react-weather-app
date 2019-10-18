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
            address.CreatedDate = DateTime.Now;
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

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<Address>> GetAddressById(int id)
        {
            var item = await _context.Addresses.AsQueryable().FirstAsync(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpGet]
        [ResponseCache(Duration = 1800)]
        [Route("zipcode/{zipcode}")]
        public async Task<ActionResult<Address>> GetAddressByZipCode(int zipcode)
        {
            var item = await _context.Addresses.AsQueryable().FirstAsync(x => x.ZipCode == zipcode);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }
    }
}