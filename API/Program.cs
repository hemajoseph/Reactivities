using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Application.Activities.Queries.GetActivityList.Handler>());
builder.Services.AddAutoMapper(typeof(Application.Core.MappingProfiles).Assembly);

var app = builder.Build();
app.UseCors(options =>
{
    options.AllowAnyHeader()
           .AllowAnyMethod()
           .WithOrigins("http://localhost:3000", "https://localhost:3000");
});
app.MapControllers();
var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DBInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
