using CentralAddressDatabase.Data;
using CentralAddressDatabase.DTOs;
using CentralAddressDatabase.DTOs.LocalAddress;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentralAddressDatabase.Controllers
{
    [ApiController]
    [Route("api/localaddress")]
    public class LocalAddressController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LocalAddressController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var addresses = await _context.LocalAddresses
                .Select(a => new LocalAddressDto
                {
                    Id = a.Id,
                    HouseNumber = a.HouseNumber,
                    StreetName = a.StreetName,
                    AreaName = a.AreaName,
                    PostalCode = a.PostalCode,
                    WardId = a.WardId
                })
                .ToListAsync();

            return Ok(addresses);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateLocalAddressDto dto)
        {
            var address = new LocalAddress
            {
                Id = Guid.NewGuid(),
                HouseNumber = dto.HouseNumber,
                StreetName = dto.StreetName,
                AreaName = dto.AreaName,
                PostalCode = dto.PostalCode,
                WardId = dto.WardId
            };

            _context.LocalAddresses.Add(address);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
