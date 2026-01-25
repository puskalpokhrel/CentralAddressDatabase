using CentralAddressDatabase.Data;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentralAddressDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DistrictController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DistrictController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/district
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Districts.Include(d => d.Province).ToListAsync());
        }

        // GET: api/district/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var district = await _context.Districts
                .Include(d => d.Province)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (district == null)
                return NotFound();

            return Ok(district);
        }

        // POST: api/district
        [HttpPost]
        public async Task<IActionResult> Create(District district)
        {
            if (!await _context.Provinces.AnyAsync(p => p.Id == district.ProvinceId))
                return BadRequest("Invalid ProvinceId");

            district.Id = Guid.NewGuid();
            _context.Districts.Add(district);
            await _context.SaveChangesAsync();

            return Ok(district);
        }

        // PUT: api/district/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, District district)
        {
            if (id != district.Id)
                return BadRequest();

            _context.Entry(district).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/district/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var district = await _context.Districts.FindAsync(id);
            if (district == null)
                return NotFound();

            _context.Districts.Remove(district);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
