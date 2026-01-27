using CentralAddressDatabase.Data;
using CentralAddressDatabase.DTOs;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/municipality")]
public class MunicipalityController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MunicipalityController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/municipality
    [HttpGet]
    public async Task<IEnumerable<MunicipalityDto>> GetAll()
    {
        return await _context.Municipalities
            .Select(m => new MunicipalityDto
            {
                Id = m.Id,
                MunicipalityName = m.MunicipalityName,
                MunicipalityType = m.MunicipalityType,
                DistrictId = m.DistrictId
            })
            .ToListAsync();
    }

    // POST: api/municipality
    [HttpPost]
    public async Task<IActionResult> Create(MunicipalityDto dto)
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

    // PUT: api/municipality/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, MunicipalityDto dto)
    {
        var municipality = await _context.Municipalities.FindAsync(id);
        if (municipality == null) return NotFound();

        municipality.MunicipalityName = dto.MunicipalityName;
        municipality.MunicipalityType = dto.MunicipalityType;
        municipality.DistrictId = dto.DistrictId;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/municipality/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var municipality = await _context.Municipalities.FindAsync(id);
        if (municipality == null) return NotFound();

        _context.Municipalities.Remove(municipality);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
