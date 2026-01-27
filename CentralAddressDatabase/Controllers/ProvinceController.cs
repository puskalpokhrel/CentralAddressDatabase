using CentralAddressDatabase.Data;
using CentralAddressDatabase.DTOs;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public async Task<IEnumerable<ProvinceDto>> GetAll()
    {
        return await _context.Provinces
            .Select(p => new ProvinceDto
            {
                Id = p.Id,
                ProvinceName = p.ProvinceName
            })
            .ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Create(ProvinceDto dto)
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

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, ProvinceDto dto)
    {
        var province = await _context.Provinces.FindAsync(id);
        if (province == null) return NotFound();

        province.ProvinceName = dto.ProvinceName;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var province = await _context.Provinces.FindAsync(id);
        if (province == null) return NotFound();

        _context.Provinces.Remove(province);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
