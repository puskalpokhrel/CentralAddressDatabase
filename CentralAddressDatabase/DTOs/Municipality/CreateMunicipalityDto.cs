namespace CentralAddressDatabase.DTOs.Municipality
{
    public class CreateMunicipalityDto
    {
        public string MunicipalityName { get; set; }
        public string MunicipalityType { get; set; }
        public Guid DistrictId { get; set; }
    }
}
