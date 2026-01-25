using CentralAddressDatabase.Data;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentralAddressDatabase.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            return Ok(await _context.LocalAddresses
                .Include(a => a.Ward)
                .ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(LocalAddress address)
        {
            if (!await _context.Wards.AnyAsync(w => w.Id == address.WardId))
                return BadRequest("Invalid WardId");

            address.Id = Guid.NewGuid();
            _context.LocalAddresses.Add(address);
            await _context.SaveChangesAsync();

            return Ok(address);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, LocalAddress address)
        {
            if (id != address.Id)
                return BadRequest();

            _context.Entry(address).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var address = await _context.LocalAddresses.FindAsync(id);
            if (address == null)
                return NotFound();

            _context.LocalAddresses.Remove(address);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
