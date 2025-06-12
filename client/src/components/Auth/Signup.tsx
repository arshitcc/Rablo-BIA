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
import { signupSchema, type SignupSchema } from "@/schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

function Signup() {
  const [registering, setResistering] = useState(false);
  const { signup } = useAuthStore();

  const navigate = useNavigate();

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (data: SignupSchema) => {
    setResistering(true);
    const registering = toast.loading("Registering Credentials");
    try {
      await signup(data);
      navigate("/auth?tab=signup");
    } catch (err: AxiosError | any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      toast.dismiss(registering);
      setResistering(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Enter your credentials to register.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...signupForm}>
          <form
            onSubmit={signupForm.handleSubmit(handleSignup)}
            className="flex flex-col gap-4"
          >
            <FormField
              name="username"
              control={signupForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Username </FormLabel>
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
              name="fullname"
              control={signupForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name </FormLabel>
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
              name="email"
              control={signupForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Email </FormLabel>
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
              control={signupForm.control}
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
          disabled={registering}
          onClick={signupForm.handleSubmit(handleSignup)}
        >
          {registering ? (
            <LoaderIcon className="h-4 w-20 animate-spin" />
          ) : (
            "Register"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Signup;
