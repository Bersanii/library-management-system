import { Outlet } from "react-router";
import { Container, Navbar } from 'react-bootstrap';

const MainLayout = () => {
  return (
    <>
      <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand href="#home">
            Library Manager
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default MainLayout;