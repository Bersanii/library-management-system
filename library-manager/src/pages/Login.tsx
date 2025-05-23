import { useAuth } from "../context/auth";
import { useNavigate, Navigate } from "react-router";

const Login = () => {
  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login("user123");
    navigate("/dashboard", { replace: true });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;