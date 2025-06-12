import Login from "@/components/Auth/Login";
import Signup from "@/components/Auth/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Auth() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const navigate = useNavigate();

  useEffect(() => {
    if (!tab || (tab !== "login" && tab !== "signup")) {
      navigate("/auth?tab=login", { replace: true });
    }
  }, [tab, navigate]);

  if (!tab || (tab !== "login" && tab !== "signup")) {
    return null;
  }

  return (
    <div className="h-screen">
      <div className="max-w-xl mx-auto my-auto border border-white p-4 rounded-xl mt-25">
        <Tabs defaultValue={tab!}>
          <div className="mx-auto">
            <img
              width="100"
              height="100"
              src="https://img.icons8.com/fluency/100/fast-moving-consumer-goods.png"
              alt="products"
            />
            <h1 className="text-center text-3xl font-semibold">Products</h1>
          </div>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="login"
              className="cursor-pointer"
              onClick={() => navigate("/auth?tab=login")}
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="cursor-pointer"
              onClick={() => navigate("/auth?tab=signup")}
            >
              Signup
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-2">
            <Login />
          </TabsContent>
          <TabsContent value="signup" className="mt-2">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Auth;
