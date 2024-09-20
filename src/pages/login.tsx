// src/pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../Context/AuthContext"
import Swal from "sweetalert2";
import LoginForm from "../component/LoginForm"; 

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth(); 
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);

    try {
      await login(email, password);
      console.log("Login successful, redirecting...");
      router.push("/"); 
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire("ERROR!", "Login failed", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
