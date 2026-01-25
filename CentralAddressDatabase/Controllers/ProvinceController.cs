using CentralAddressDatabase.Data;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentralAddressDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProvinceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProvinceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/province
        [HttpGet]
        public async Task<IActionResult> GetAllProvinces()
        {
            var provinces = await _context.Provinces.ToListAsync();
            return Ok(provinces);
        }

        // GET: api/province/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProvinceById(Guid id)
        {
            var province = await _context.Provinces.FindAsync(id);

            if (province == null)
                return NotFound();

            return Ok(province);
        }

        // POST: api/province
        [HttpPost]
        public async Task<IActionResult> CreateProvince(Province province)
        {
            province.Id = Guid.NewGuid();

            _context.Provinces.Add(province);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetProvinceById),
                new { id = province.Id },
                province
            );
        }

        // PUT: api/province/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProvince(Guid id, Province province)
        {
            if (id != province.Id)
                return BadRequest("Province ID mismatch");

            var exists = await _context.Provinces.AnyAsync(p => p.Id == id);
            if (!exists)
                return NotFound();

            _context.Entry(province).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/province/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProvince(Guid id)
        {
            var province = await _context.Provinces.FindAsync(id);
            if (province == null)
                return NotFound();

            _context.Provinces.Remove(province);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
