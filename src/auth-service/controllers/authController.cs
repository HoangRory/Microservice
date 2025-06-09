using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using auth_service.Data;
using auth_service.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        Console.WriteLine($"Login attempt for user: {dto.Username}");
        Console.WriteLine($"Login attempt for user: {dto.Password}");

        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == dto.Username);
        if (user == null)
        {
            Console.WriteLine("User not found.");
            return Unauthorized(new { error = "Invalid credentials" });
        }
        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            Console.WriteLine("Invalid password.");
            return Unauthorized(new { error = "Invalid credentials" });
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtKey = _config["Jwt:Key"];
        if (string.IsNullOrEmpty(jwtKey))
            return StatusCode(500, new { error = "JWT key is not configured." });
        var key = Encoding.ASCII.GetBytes(jwtKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return Ok(new { token = tokenHandler.WriteToken(token) });
    }
}

public class LoginDto
{
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
}
