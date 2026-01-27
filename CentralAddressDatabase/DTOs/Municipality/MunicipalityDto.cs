using System;

namespace CentralAddressDatabase.DTOs
{
    public class MunicipalityDto
    {
        public Guid Id { get; set; }
        public string MunicipalityName { get; set; }
        public string MunicipalityType { get; set; }
        public Guid DistrictId { get; set; }
    }
}
