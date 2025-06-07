import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/auth";
import Login from "./pages/Login";
import DashboardAdm from "./pages/DashboardAdm";
import DashboardSer from "./pages/DashboardSer";
import Emprestimos from "./pages/Emprestimos";
import Emprestimo from "./pages/Emprestimo";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Obra from "./pages/Obra";
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayout from "./layouts/MainLayout";

// import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/custom.scss';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/obra/:isbn", element: <Obra /> },  
          {
            element: <ProtectedRoute />,
            children: [
              { path: "dashboard-adm", element: <DashboardAdm /> },
              { path: "dashboard-ser", element: <DashboardSer /> },
              { path: "emprestimos", element: <Emprestimos /> },
              { path: "emprestimo", element: <Emprestimo /> }
            ]
          }
        ] 
      },
      {
        element: <EmptyLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "cadastro", element: <Cadastro /> },
        ]
      }
    ]
  }
]);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;