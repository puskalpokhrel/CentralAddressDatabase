using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CentralAddressDatabase.Models
{
    public class District
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string DistrictName { get; set; } 

        [ForeignKey("Province")]
        public Guid ProvinceId { get; set; }

        public Province Province { get; set; } 

        public ICollection<Municipality> Municipalities { get; set; }
    }
}
