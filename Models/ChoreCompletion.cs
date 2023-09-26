using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models;

public class ChoreCompletion
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    [Required]
    public UserProfile UserProfile { get; set; }
    public int ChoreId { get; set; }
    [Required]
    public Chore Chore { get; set; }
    public DateTime CompletedOn { get; set; }

}