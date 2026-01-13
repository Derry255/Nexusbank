import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBank } from "@/context/BankContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useBank();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export default Index;
