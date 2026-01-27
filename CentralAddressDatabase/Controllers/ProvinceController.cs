using CentralAddressDatabase.Data;
using CentralAddressDatabase.DTOs;
using CentralAddressDatabase.DTOs.Province;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentralAddressDatabase.Controllers
{
    [ApiController]
    [Route("api/province")]
    public class ProvinceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProvinceController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var provinces = await _context.Provinces
                .Select(p => new ProvinceDto
                {
                    Id = p.Id,
                    ProvinceName = p.ProvinceName
                })
                .ToListAsync();

            return Ok(provinces);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProvinceDto dto)
        {
            var province = new Province
            {
                Id = Guid.NewGuid(),
                ProvinceName = dto.ProvinceName
            };

            _context.Provinces.Add(province);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
