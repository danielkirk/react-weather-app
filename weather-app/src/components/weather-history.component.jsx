import React, { Component } from "react";
import { Table, Item } from "semantic-ui-react";
import axios from "axios";

class WeatherHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: []
    };
  }
  async componentDidMount() {
    const getHistory = await axios.get("/api/address");
    console.log(getHistory);
    this.setState(
      {
        weatherData: getHistory.data
      },
      () => console.log(this.state)
    );
  }
  render() {
    return (
      <div>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Weather</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.weatherData &&
              this.state.weatherData.map((weather, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{weather.city}</Table.Cell>
                    <Table.Cell>
                      {new Date(weather.createdDate).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell textAlign="right">{weather.zipCode}</Table.Cell>
                    <Table.Cell textAlign="right">
                      {weather.weatherType}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default WeatherHistory;
