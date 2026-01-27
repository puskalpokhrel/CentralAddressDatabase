using System;

namespace CentralAddressDatabase.DTOs
{
    public class DistrictDto
    {
        public Guid Id { get; set; }
        public string DistrictName { get; set; }
        public Guid ProvinceId { get; set; }
    }
}
