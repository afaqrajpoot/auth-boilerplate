import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  PasswordInput,
} from "@/components";

import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PAGE_ROUTES } from "@/constants";
import { useState } from "react";
import { useAuthContext } from "@/contexts";
import { postRegisterReqSchema, postRegisterReqType } from "@/schemas";
import { Link, Navigate } from "react-router-dom";

const defaultValues: postRegisterReqType = {
  email: "",
  name: "",
  password: "",
};

export default function RegisterPage() {
  const { register: handleRegister } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<postRegisterReqType>({
    defaultValues,
    resolver: zodResolver(postRegisterReqSchema),
    delayError: 500,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (values: postRegisterReqType) => {
    setIsLoading(true);
    handleRegister(values)
      .then((res) => {
        if (!res) {
          setIsLoading(false);
          return;
        }
        <Navigate to={PAGE_ROUTES.AUTH.LOGIN} />;
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen gap-8">
      <h1 className="text-3xl font-extrabold"></h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your email below to register your account. <br />
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                {...register("name")}
                id="name"
                type="name"
                placeholder="Full name"
              />

              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput {...register("password")} id="password" />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <div className="w-full">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <LoaderCircle className="animate-spin" />}

                <span className="ml-2">Sign up</span>
              </Button>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to={PAGE_ROUTES.AUTH.LOGIN} className="underline">
                  Login
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
