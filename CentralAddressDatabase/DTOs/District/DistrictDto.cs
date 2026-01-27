namespace CentralAddressDatabase.DTOs.District
{
    public class DistrictDto
    {
        public Guid Id { get; set; }
        public string DistrictName { get; set; }

        public Guid ProvinceId { get; set; }
        public string ProvinceName { get; set; }
    }
}
