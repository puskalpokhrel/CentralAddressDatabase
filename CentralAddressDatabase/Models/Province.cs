using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CentralAddressDatabase.Models
{
    public class Province
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string ProvinceName { get; set; }

        public ICollection<District> Districts { get; set; } = new List<District>();
    }
}
