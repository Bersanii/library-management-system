import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import MainLayout from "./layouts/MainLayout";

import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "login", element: <Login /> },
      { path: "cadastro", element: <Cadastro /> },
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home /> },
          {
            element: <ProtectedRoute />,
            children: [
              { path: "dashboard", element: <Dashboard /> }
            ]
          }
        ] 
      },
      
    ]
  }
]);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;