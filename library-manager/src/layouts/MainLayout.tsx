import { Outlet } from "react-router";
import { Container, Navbar } from 'react-bootstrap';
import { useAuth } from "../context/auth";

const MainLayout = () => {
  const { isLogged, user } = useAuth();

  return (
    <>
      <Navbar className="bg-primary">
        <Container>
          <Navbar.Brand href="#home" className="text-light">
            Library Manager
          </Navbar.Brand>
          
          {isLogged ? 
            <>{user.nome}</> 
            : 'Loggar'
          }
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default MainLayout;