namespace CentralAddressDatabase.DTOs.Ward
{
    public class CreateWardDto
    {
        public string WardName { get; set; }
        public Guid MunicipalityId { get; set; }
    }
}
