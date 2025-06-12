import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { loginSchema, type LoginSchema } from "@/schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

function Login() {
  const [logining, setLogining] = useState(false);
  const { login } = useAuthStore();

  const navigate = useNavigate();

  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginSchema) => {
    setLogining(true);
    const logining = toast.loading("Authenticating Credentials");
    try {
      await login(data);
      navigate("/products");
    } catch (err: AxiosError | any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      toast.dismiss(logining);
      setLogining(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 ">
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(handleLogin)}
            className="flex flex-col gap-4"
          >
            <FormField
              name="user"
              control={loginForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Username / Email </FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={loginForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Password </FormLabel>
                  <Input
                    type="password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          className="cursor-pointer"
          disabled={logining}
          onClick={loginForm.handleSubmit(handleLogin)}
        >
          {logining ? (
            <LoaderIcon className="h-4 w-20 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Login;
