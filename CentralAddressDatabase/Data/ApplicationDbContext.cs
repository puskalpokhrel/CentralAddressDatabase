using Microsoft.EntityFrameworkCore;
using CentralAddressDatabase.Models;

namespace CentralAddressDatabase.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Province> Provinces { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Municipality> Municipalities { get; set; }
        public DbSet<Ward> Wards { get; set; }
        public DbSet<LocalAddress> LocalAddresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Optional: enforce relationships explicitly
            modelBuilder.Entity<Province>()
                .HasMany(p => p.Districts)
                .WithOne(d => d.Province)
                .HasForeignKey(d => d.ProvinceId);

            modelBuilder.Entity<District>()
                .HasMany(d => d.Municipalities)
                .WithOne(m => m.District)
                .HasForeignKey(m => m.DistrictId);

            modelBuilder.Entity<Municipality>()
                .HasMany(m => m.Wards)
                .WithOne(w => w.Municipality)
                .HasForeignKey(w => w.MunicipalityId);

            modelBuilder.Entity<Ward>()
                .HasMany(w => w.LocalAddresses)
                .WithOne(a => a.Ward)
                .HasForeignKey(a => a.WardId);
        }
    }
}
