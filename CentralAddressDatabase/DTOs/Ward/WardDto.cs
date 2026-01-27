using System;

namespace CentralAddressDatabase.DTOs
{
    public class WardDto
    {
        public Guid Id { get; set; }
        public string WardName { get; set; }
        public Guid MunicipalityId { get; set; }
    }
}
