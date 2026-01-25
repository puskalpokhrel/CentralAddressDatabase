using CentralAddressDatabase.Data; // change if your namespace differs
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//
// 🔹 Add services to the container
//

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DbContext (SQL Server)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS for Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

//
// 🔹 Configure the HTTP request pipeline
//

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS
app.UseHttpsRedirection();

// CORS (must be BEFORE Authorization)
app.UseCors("AllowAngular");

// Authorization
app.UseAuthorization();

// Map controllers
app.MapControllers();

app.Run();
