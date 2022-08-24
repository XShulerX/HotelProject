using HotelProject.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace HotelProject.Controllers
{
    [Route("api/[controller]")]
    public class GuestsController : Controller
    {
        private GuestContext db;

        public GuestsController(GuestContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Guest> Get()
        {
            return db.Hotel;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Guest guest)
        {
            if(guest.Name.Length <= 10 || guest.Room <= 0)
            {
                Regex r = new Regex(@"^[A-Z][a-z]+\z");
                if (!r.IsMatch(guest.Name))
                {
                    return NoContent();
                }
            }
            db.Hotel.Add(guest);
            await db.SaveChangesAsync();
            return Ok(guest);

        }

    }
}
