import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import GlobalCatList from "../containers/GlobalCatList";
import LocalCatList from "../containers/LocalCatList";
import Home from "../containers/Home";

class NavbarComponent extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar bg="dark" variant={"dark"} expand="lg">
            <Container>
              <Navbar.Brand as={Link} to={"/"}>
                Cat-SPA
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={"/globalcats"}>
                    Global cat list
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/localcats"}>
                    My cat list
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route path="/globalcats">
              <GlobalCatList />
            </Route>
            <Route path="/localcats">
              <LocalCatList />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default NavbarComponent;
