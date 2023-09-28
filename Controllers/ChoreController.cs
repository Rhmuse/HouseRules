using System.Net.Http.Headers;
using HouseRules.Data;
using HouseRules.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HouseRules.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    public HouseRulesDbContext _dbContext { get; set; }

    public ChoreController(HouseRulesDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    #region api/chore

    [HttpGet]
    [Authorize]
    public IActionResult Get(int userId)
    {
        if (userId == 0) return Ok(_dbContext.Chores.Include(c => c.ChoreCompletions).OrderBy(c => c.Id).ToList());
        return Ok(_dbContext.ChoreAssignments
            .Include(ca => ca.Chore)
            .ThenInclude(c => c.ChoreCompletions)
            .Where(ca => ca.UserProfileId == userId)
            .ToList());


    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult Post(Chore chore)
    {
        if (chore != null)
        {
            _dbContext.Chores.Add(chore);
            _dbContext.SaveChanges();
            return Created($"{chore.Id}", chore);
        }
        return BadRequest();
    }

    #endregion

    #region api/{id}

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        Chore foundChore = _dbContext.Chores
            .Include(c => c.ChoreCompletions)
            .ThenInclude(cc => cc.UserProfile)
            .Include(c => c.ChoreAssignments)
            .ThenInclude(ca => ca.UserProfile)
            .SingleOrDefault(c => c.Id == id);

        if (foundChore == null) return NotFound();

        return Ok(foundChore);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult UpdateChore(int id, Chore chore)
    {
        var foundChore = _dbContext.Chores.SingleOrDefault(c => c.Id == id);

        if (foundChore == null) return BadRequest();

        foundChore.Name = chore.Name;
        foundChore.Difficulty = chore.Difficulty;
        foundChore.ChoreFrequencyDays = chore.ChoreFrequencyDays;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteChore(int id)
    {
        var foundChore = _dbContext.Chores.SingleOrDefault(c => c.Id == id);

        if (foundChore == null) return BadRequest();

        _dbContext.Chores.Remove(foundChore);
        _dbContext.SaveChanges();
        return NoContent();
    }

    #endregion

    [HttpPost("{id}/complete")]
    [Authorize(Roles = "Admin")]
    public IActionResult ChoreCompletion(int id, int userId)
    {
        var foundUser = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == userId);
        if (foundUser != null)
        {

            var newCompletion = new ChoreCompletion
            {
                ChoreId = id,
                UserProfileId = userId,
                CompletedOn = DateTime.Now
            };
            _dbContext.Add(newCompletion);
            _dbContext.SaveChanges();
            return NoContent();
        }
        return BadRequest();
    }

    [HttpPost("{id}/assign")]
    [Authorize(Roles = "Admin")]
    public IActionResult ChoreAssign(int id, int userId)
    {
        var foundChore = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        var foundUser = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == userId);
        if (foundChore == null || foundUser == null) return BadRequest();

        var newChoreAssignment = new ChoreAssignment()
        {
            UserProfileId = userId,
            ChoreId = id
        };
        _dbContext.ChoreAssignments.Add(newChoreAssignment);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("{id}/unassign")]
    [Authorize(Roles = "Admin")]
    public IActionResult ChoreUnassign(int id, int userId)
    {
        var foundChoreAssignment = _dbContext.ChoreAssignments.SingleOrDefault(ca => ca.ChoreId == id && ca.UserProfileId == userId);
        if (foundChoreAssignment == null) return BadRequest();
        _dbContext.ChoreAssignments.Remove(foundChoreAssignment);
        _dbContext.SaveChanges();
        return NoContent();
    }
}