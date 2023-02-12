import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import Logo from "../../components/Logo";
import useAuth from "../../hooks/useAuth";

export async function loader() {
  const { user } = useAuth();

  if (localStorage.getItem("token")) {
    return { user: true };
  }
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    await login(data.email, data.password);
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex w-full items-center justify-center">
          <Logo type="full" />
        </div>
        <h2 className="mt-8 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or
          <Link
            to="/auth/register"
            className="font-medium text-brand-600 hover:text-brand-500"
          >
            {" "}
            create your free account
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
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
              />
              <Button isLoading={loading} fullWidth={true} type="submit">
                Log In
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
