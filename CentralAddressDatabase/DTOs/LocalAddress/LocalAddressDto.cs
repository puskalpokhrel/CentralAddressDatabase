using System;

namespace CentralAddressDatabase.DTOs
{
    public class LocalAddressDto
    {
        public Guid Id { get; set; }
        public string HouseNumber { get; set; }
        public string StreetName { get; set; }
        public string AreaName { get; set; }
        public string PostalCode { get; set; }
        public Guid WardId { get; set; }
    }
}
