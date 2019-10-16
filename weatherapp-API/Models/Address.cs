namespace weatherapp_API.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string City { get; set; }
        public int Temperature { get; set; }
        public int MinTemperature { get; set; }
        public int MaxTemperature { get; set; }
        public string WeatherType { get; set; }
        //     city: "",
        //   mainTemp: "",
        //   minTemp: "",
        //   maxTemp: "",
        //   weatherType: "",
    }
}