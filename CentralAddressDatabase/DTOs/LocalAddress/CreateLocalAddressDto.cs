namespace CentralAddressDatabase.DTOs.LocalAddress
{
    public class CreateLocalAddressDto
    {
        public string HouseNumber { get; set; }
        public string StreetName { get; set; }
        public string AreaName { get; set; }
        public string PostalCode { get; set; }

        public Guid WardId { get; set; }
    }
}
