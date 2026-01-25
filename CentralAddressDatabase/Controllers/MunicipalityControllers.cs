using CentralAddressDatabase.Data;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentralAddressDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            return Ok(await _context.Municipalities
                .Include(m => m.District)
                .ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(Municipality municipality)
        {
            if (!await _context.Districts.AnyAsync(d => d.Id == municipality.DistrictId))
                return BadRequest("Invalid DistrictId");

            municipality.Id = Guid.NewGuid();
            _context.Municipalities.Add(municipality);
            await _context.SaveChangesAsync();

            return Ok(municipality);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Municipality municipality)
        {
            if (id != municipality.Id)
                return BadRequest();

            _context.Entry(municipality).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var municipality = await _context.Municipalities.FindAsync(id);
            if (municipality == null)
                return NotFound();

            _context.Municipalities.Remove(municipality);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
