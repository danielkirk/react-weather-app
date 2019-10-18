using System;
using System.ComponentModel.DataAnnotations.Schema;
using weatherapp_API.Models;

public class WeatherHistory
{
    public int Id { get; set; }

    [ForeignKey("Address")]
    public int AddressId { get; set; }
    public Address Address { get; set; }

    public DateTime CreatedDate { get; set; }
}