using CentralAddressDatabase.Data;
using CentralAddressDatabase.DTOs;
using CentralAddressDatabase.DTOs.Municipality;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentralAddressDatabase.Controllers
{
    [ApiController]
    [Route("api/municipality")]
    public class MunicipalityController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MunicipalityController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var municipalities = await _context.Municipalities
                .Select(m => new MunicipalityDto
                {
                    Id = m.Id,
                    MunicipalityName = m.MunicipalityName,
                    MunicipalityType = m.MunicipalityType,
                    DistrictId = m.DistrictId
                })
                .ToListAsync();

            return Ok(municipalities);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateMunicipalityDto dto)
        {
            var municipality = new Municipality
            {
                Id = Guid.NewGuid(),
                MunicipalityName = dto.MunicipalityName,
                MunicipalityType = dto.MunicipalityType,
                DistrictId = dto.DistrictId
            };

            _context.Municipalities.Add(municipality);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
