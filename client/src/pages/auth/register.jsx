import Logo from "@/assets/logo";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { cookieKeys } from "@/libs/cookie-constants";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { register: registerNewUser } = useAuth();
  const navigate = useNavigate();
  const [cookies] = useCookies([cookieKeys.authToken]);

  useEffect(() => {
    if (cookies.authToken) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (inputs) => {
    setLoading(true);
    registerNewUser.mutate({
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    });
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex w-full items-center justify-center">
          <Logo type="full" />
        </div>
        <h2 className="mt-8 text-center text-3xl font-extrabold ">
          Create your new account
        </h2>
        <p className="mt-2 text-center text-sm">
          Or
          <Link
            to="/auth/login"
            className="font-medium text-brand-300 hover:text-brand-500"
          >
            {" "}
            sign in to your account
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 sm:mx-auto sm:max-w-md max-w-full px-12 sm:px-0">
          <div className="border border-gray-800 py-8 px-14 shadow rounded-lg sm:px-8">
            <div className="space-y-6">
              <Input
                register={register}
                config={{ required: "Name is required" }}
                isError={errors.name ? true : false}
                errorMessage={errors.name?.message}
                name="name"
                label="Name"
                placeholder="jethalal"
              />
              <Input
                register={register}
                config={{ required: "Email Address is required" }}
                isError={errors.email ? true : false}
                errorMessage={errors.email?.message}
                name="email"
                label="Email address"
                placeholder="jethalal@gada.com"
              />
              <Input
                register={register}
                config={{ required: "Password required" }}
                isError={errors.password ? true : false}
                errorMessage={errors.password?.message}
                name="password"
                label="Password"
                placeholder="123456"
                type="password"
              />
              <Button
                isLoading={registerNewUser.isLoading}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
