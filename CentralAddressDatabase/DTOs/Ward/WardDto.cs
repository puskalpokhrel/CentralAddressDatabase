namespace CentralAddressDatabase.DTOs.Ward
{
    public class WardDto
    {
        public Guid Id { get; set; }
        public string WardName { get; set; }

        public Guid MunicipalityId { get; set; }
        public string MunicipalityName { get; set; }
    }
}
