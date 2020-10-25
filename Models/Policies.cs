using System;
using System.ComponentModel.DataAnnotations;

namespace CapStone10.Models
{
    public class Policy
    {

        public int Id { get; set; }

        [Required]
        public string Location { get; set; }
        public string Type { get; set; }
        [Required]
        public DateTime Coverage { get; private set; } = DateTime.Now;
        [Required]
        public int Premium { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}