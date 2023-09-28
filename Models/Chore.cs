using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models;

public class Chore
{
    public int Id { get; set; }
    [MaxLength(100, ErrorMessage = "Chore name must 100 characters or less.")]
    public string Name { get; set; }
    [Range(1, 5, ErrorMessage = "Chore difficulty must be between 1 and 5.")]
    public int Difficulty { get; set; }
    public int ChoreFrequencyDays { get; set; }
    public List<ChoreCompletion>? ChoreCompletions { get; set; }
    public List<ChoreAssignment>? ChoreAssignments { get; set; }
    public bool? Overdue
    {
        get
        {
            if (ChoreCompletions != null)
            {
                if (ChoreCompletions.Count == 0) return true;
                var mostRecentCompletion = ChoreCompletions.Single(cc => cc.Id == ChoreCompletions.Max(cc => cc.Id));
                TimeSpan frequency = new TimeSpan(ChoreFrequencyDays * 86400000);

                if (mostRecentCompletion.CompletedOn - frequency < DateTime.Today) return true;

                return false;
            }
            return null;
        }
    }
}