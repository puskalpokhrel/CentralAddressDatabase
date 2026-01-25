using CentralAddressDatabase.Data;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentralAddressDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            return Ok(await _context.Wards
                .Include(w => w.Municipality)
                .ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(Ward ward)
        {
            if (!await _context.Municipalities.AnyAsync(m => m.Id == ward.MunicipalityId))
                return BadRequest("Invalid MunicipalityId");

            ward.Id = Guid.NewGuid();
            _context.Wards.Add(ward);
            await _context.SaveChangesAsync();

            return Ok(ward);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Ward ward)
        {
            if (id != ward.Id)
                return BadRequest();

            _context.Entry(ward).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var ward = await _context.Wards.FindAsync(id);
            if (ward == null)
                return NotFound();

            _context.Wards.Remove(ward);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
