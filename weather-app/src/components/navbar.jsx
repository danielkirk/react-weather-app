import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { withRouter, Route } from "react-router-dom";
import WeatherHistory from "./weather-history.component";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item header onClick={() => this.props.history.push("/")}>
              Weather App
            </Menu.Item>
            <Menu.Item>
              <Button
                onClick={() => this.props.history.push("/history")}
                positive
                content="View History"
              ></Button>
            </Menu.Item>
          </Container>
        </Menu>
        <br />
        <br />
        <Route exact path="/history" component={WeatherHistory} />
      </React.Fragment>
    );
  }
}

export default withRouter(NavBar);
