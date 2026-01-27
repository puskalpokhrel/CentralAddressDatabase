using CentralAddressDatabase.Data;
using CentralAddressDatabase.DTOs;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public async Task<IEnumerable<DistrictDto>> GetAll()
    {
        return await _context.Districts
            .Select(d => new DistrictDto
            {
                Id = d.Id,
                DistrictName = d.DistrictName,
                ProvinceId = d.ProvinceId
            })
            .ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Create(DistrictDto dto)
    {
        _context.Districts.Add(new District
        {
            Id = Guid.NewGuid(),
            DistrictName = dto.DistrictName,
            ProvinceId = dto.ProvinceId
        });

        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, DistrictDto dto)
    {
        var d = await _context.Districts.FindAsync(id);
        if (d == null) return NotFound();

        d.DistrictName = dto.DistrictName;
        d.ProvinceId = dto.ProvinceId;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var d = await _context.Districts.FindAsync(id);
        if (d == null) return NotFound();

        _context.Districts.Remove(d);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
