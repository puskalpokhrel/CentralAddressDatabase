using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CentralAddressDatabase.Models
{
    public class Ward
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string WardName { get; set; }

        [ForeignKey(nameof(Municipality))]
        public Guid MunicipalityId { get; set; }

        public Municipality Municipality { get; set; }

        public ICollection<LocalAddress> LocalAddresses { get; set; } = new List<LocalAddress>();
    }
}
