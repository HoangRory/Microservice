using Microsoft.AspNetCore.Mvc;
using ProfileService.Data;
using ProfileService.Models;

namespace ProfileService.Controllers
{
    [ApiController]
    [Route("profile")]
    public class ProfileController : ControllerBase
    {
        private readonly ProfileDbContext _context;

        public ProfileController(ProfileDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public IActionResult GetByUserId(string userId)
        {
            var profile = _context.Profiles.FirstOrDefault(p => p.UserId == userId);
            if (profile == null) return NotFound();
            return Ok(profile);
        }

    }
}