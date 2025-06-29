import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/auth";
import Login from "./pages/Login";
import DashboardAdm from "./pages/DashboardAdm";
import DashboardSer from "./pages/DashboardSer";
import Emprestimo from "./pages/Emprestimo";
import DashboardAlu from "./pages/DashboardAlu";
import Devolucao from "./pages/Devolucao";
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
              { path: "dashboard-alu", element: <DashboardAlu /> },
              { path: "emprestimo", element: <Emprestimo /> },
              { path: "devolucao", element: <Devolucao /> }
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