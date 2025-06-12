import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  authentication: boolean;
}

function AuthLayout({ children, authentication }: AuthLayoutProps) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (authentication && isAuthenticated !== authentication) {
      navigate("/auth?tab=login");
    } else if (!authentication && isAuthenticated !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [isAuthenticated, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
