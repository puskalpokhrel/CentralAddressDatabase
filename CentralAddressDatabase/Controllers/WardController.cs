using CentralAddressDatabase.Data;
using CentralAddressDatabase.DTOs;
using CentralAddressDatabase.DTOs.Ward;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentralAddressDatabase.Controllers
{
    [ApiController]
    [Route("api/ward")]
    public class WardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WardController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var wards = await _context.Wards
                .Select(w => new WardDto
                {
                    Id = w.Id,
                    WardName = w.WardName,
                    MunicipalityId = w.MunicipalityId
                })
                .ToListAsync();

            return Ok(wards);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateWardDto dto)
        {
            var ward = new Ward
            {
                Id = Guid.NewGuid(),
                WardName = dto.WardName,
                MunicipalityId = dto.MunicipalityId
            };

            _context.Wards.Add(ward);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
