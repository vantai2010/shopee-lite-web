import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header(props) {
  const { title } = props;
  const userData = useSelector((state) => state.app.userData);
  const [titlePage, setTitlePage] = useState(false);
  const [linkPage, setLinkPage] = useState(false);
  useEffect(() => {
    if (title === "Trang Admin") {
      setTitlePage(true);
      setLinkPage(true);
    }
  }, [title]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      data-bs-theme="light"
      className="bg-body-tertiary z-0"
    >
      <Container>
        <Navbar.Brand href="#home">
          <Link to="/admin" className="text-decoration-none">
            {titlePage ? "Admin" : "Agency"}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                to={linkPage ? "list-agency" : "list-product"}
                className="text-decoration-none"
              >
                {titlePage ? "Supplier" : "Product"}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to={linkPage ? "list-user" : "list-transaction"}
                className="text-decoration-none"
              >
                {titlePage ? "User" : "Transaction"}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to={linkPage ? "list-history" : "history"}
                className="text-decoration-none"
              >
                {titlePage ? "History" : "History"}
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Language" id="collapsible-nav-dropdown">
              <NavDropdown.Item>Vietnamese</NavDropdown.Item>
              <NavDropdown.Item>English</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={userData?.email} id="collapsible-nav-dropdown">
              <NavDropdown.Item>
                <Link className="text-decoration-none " to="/">
                  You
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="text-decoration-none" to="/">
                  ME
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="text-decoration-none" to="/">
                  I
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link className="text-decoration-none" to="/">
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
