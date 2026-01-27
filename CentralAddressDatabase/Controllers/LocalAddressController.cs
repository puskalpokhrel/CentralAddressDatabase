using CentralAddressDatabase.Data;
using CentralAddressDatabase.DTOs;
using CentralAddressDatabase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/localaddress")]
public class LocalAddressController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LocalAddressController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/localaddress
    [HttpGet]
    public async Task<IEnumerable<LocalAddressDto>> GetAll()
    {
        return await _context.LocalAddresses
            .Select(l => new LocalAddressDto
            {
                Id = l.Id,
                HouseNumber = l.HouseNumber,
                StreetName = l.StreetName,
                AreaName = l.AreaName,
                PostalCode = l.PostalCode,
                WardId = l.WardId
            })
            .ToListAsync();
    }

    // POST: api/localaddress
    [HttpPost]
    public async Task<IActionResult> Create(LocalAddressDto dto)
    {
        var address = new LocalAddress
        {
            Id = Guid.NewGuid(),
            HouseNumber = dto.HouseNumber,
            StreetName = dto.StreetName,
            AreaName = dto.AreaName,
            PostalCode = dto.PostalCode,
            WardId = dto.WardId
        };

        _context.LocalAddresses.Add(address);
        await _context.SaveChangesAsync();

        return Ok();
    }

    // PUT: api/localaddress/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, LocalAddressDto dto)
    {
        var address = await _context.LocalAddresses.FindAsync(id);
        if (address == null) return NotFound();

        address.HouseNumber = dto.HouseNumber;
        address.StreetName = dto.StreetName;
        address.AreaName = dto.AreaName;
        address.PostalCode = dto.PostalCode;
        address.WardId = dto.WardId;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/localaddress/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var address = await _context.LocalAddresses.FindAsync(id);
        if (address == null) return NotFound();

        _context.LocalAddresses.Remove(address);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
