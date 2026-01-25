using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CentralAddressDatabase.Models
{
    public class Municipality
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string MunicipalityName { get; set; }

        public string MunicipalityType { get; set; }

        [ForeignKey("District")]
        public Guid DistrictId { get; set; }

        public District District { get; set; }

        public ICollection<Ward> Wards { get; set; }
    }
}
