using CentralAddressDatabase.Data;
using CentralAddressDatabase.DTOs;
using CentralAddressDatabase.DTOs.District;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentralAddressDatabase.Controllers
{
    [ApiController]
    [Route("api/district")]
    public class DistrictController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DistrictController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var districts = await _context.Districts
                .Select(d => new DistrictDto
                {
                    Id = d.Id,
                    DistrictName = d.DistrictName,
                    ProvinceId = d.ProvinceId
                })
                .ToListAsync();

            return Ok(districts);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateDistrictDto dto)
        {
            var district = new District
            {
                Id = Guid.NewGuid(),
                DistrictName = dto.DistrictName,
                ProvinceId = dto.ProvinceId
            };

            _context.Districts.Add(district);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
