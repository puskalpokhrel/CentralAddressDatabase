using CentralAddressDatabase.Data;
using CentralAddressDatabase.DTOs;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/ward")]
public class WardController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public WardController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/ward
    [HttpGet]
    public async Task<IEnumerable<WardDto>> GetAll()
    {
        return await _context.Wards
            .Select(w => new WardDto
            {
                Id = w.Id,
                WardName = w.WardName,
                MunicipalityId = w.MunicipalityId
            })
            .ToListAsync();
    }

    // POST: api/ward
    [HttpPost]
    public async Task<IActionResult> Create(WardDto dto)
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

    // PUT: api/ward/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, WardDto dto)
    {
        var ward = await _context.Wards.FindAsync(id);
        if (ward == null) return NotFound();

        ward.WardName = dto.WardName;
        ward.MunicipalityId = dto.MunicipalityId;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/ward/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var ward = await _context.Wards.FindAsync(id);
        if (ward == null) return NotFound();

        _context.Wards.Remove(ward);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
