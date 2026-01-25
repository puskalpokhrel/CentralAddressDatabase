using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CentralAddressDatabase.Models
{
    public class LocalAddress
    {
        [Key]
        public Guid Id { get; set; }

        public string HouseNumber { get; set; }
        public string StreetName { get; set; }
        public string AreaName { get; set; }
        public string PostalCode { get; set; }

        [ForeignKey("Ward")]
        public Guid WardId { get; set; }

        public Ward Ward { get; set; }
    }
}
