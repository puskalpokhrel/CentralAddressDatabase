namespace CentralAddressDatabase.DTOs.District
{
    public class CreateDistrictDto
    {
        public string DistrictName { get; set; }
        public Guid ProvinceId { get; set; }
    }
}
