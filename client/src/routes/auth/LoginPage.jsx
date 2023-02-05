import { Link } from "react-router-dom";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import Logo from "../../components/Logo";

export default function LoginPage() {
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

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <Input label="Email address" />
            <Input label="Password" />
            <Button fullWidth={true}>Log In</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
