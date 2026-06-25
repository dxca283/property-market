"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Modal from "./Modal";
import { useState } from "react";
import { loginSchema, LoginValues } from "@/schemas/auth.schema";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signinWithGoogle } from "@/services/SignInWithGoogle";

type LoginError = Partial<Record<keyof LoginValues, string>>;

const LoginModal = () => {
  const { openRegister, closeLogin, isLoginOpen } = useAuthStore();
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LoginError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: undefined }));
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    const validation = loginSchema.safeParse(values);

    if (!validation.success) {
      setLoading(false);

      const tree = z.treeifyError(validation.error);

      setError({
        email: tree.properties?.email?.errors?.[0],
        password: tree.properties?.password?.errors?.[0],
      });
      return;
    }

    // Register user
    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message as string);
        return;
      }
      toast.success("Logged in successfully");
      closeLogin();
      setValues((prev) => ({
        ...prev,
        email: "",
        password: "",
      }));
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Login" onClose={closeLogin} isOpen={isLoginOpen}>
      {/* header */}
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome back!</h2>
        <p className="text-sm text-gray-500">
          Please enter your credentials to login
        </p>
      </div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <Input
          id="login-email"
          name="email"
          label="Email"
          value={values.email}
          onchange={handleChange}
          error={error.email}
          disabled={loading}
        />
        <Input
          id="login-password"
          name="password"
          label="Password"
          value={values.password}
          onchange={handleChange}
          error={error.password}
          disabled={loading}
        />
        <Button fullwidth loading={loading} type="submit">
          Login
        </Button>
      </form>
      {/* divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-500">Or</span>
        </div>
      </div>

      <Button
        icon={<FcGoogle size={22} />}
        iconPosition="right"
        variant="outline"
        fullwidth
        disabled={loading}
        onClick={signinWithGoogle}
      >
        Continue with Google
      </Button>
      <p className="text-gray-400 text-center text-sm mt-6">
        Don&apos;t have an accout?
        <span
          onClick={openRegister}
          className="text-primary hover:underline font-semibold cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </Modal>
  );
};

export default LoginModal;
