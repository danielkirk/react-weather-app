using System;

namespace weatherapp_API.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string City { get; set; }
        public decimal Temperature { get; set; }
        public decimal MinTemperature { get; set; }
        public decimal MaxTemperature { get; set; }
        public string WeatherType { get; set; }

        public string Icon { get; set; }

        public int ZipCode { get; set; }

        public DateTime CreatedDate { get; set; }

        //     city: "",
        //   mainTemp: "",
        //   minTemp: "",
        //   maxTemp: "",
        //   weatherType: "",
    }
}