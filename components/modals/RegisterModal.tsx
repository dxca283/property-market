"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Modal from "./Modal";
import { registerSchema, RegisterValues } from "@/schemas/auth.schema";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const RegisterModal = () => {
  const { openLogin, closeRegister, isRegisterOpen } = useAuthStore();

  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validation = registerSchema.safeParse(values);
    if (!validation.success) {
      setLoading(false);
      setErrors(validation.error.flatten().fieldErrors as RegisterErrors);
      return;
    }

    // Register the user
  };
  return (
    <Modal title="Register" onClose={closeRegister} isOpen={isRegisterOpen}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          id="register-name"
          name="name"
          label="Full Name"
          value={values.name}
          onchange={handleChange}
          error={errors.name}
          disabled={loading}
        />
        <Input
          id="register-email"
          name="email"
          label="Email"
          value={values.email}
          onchange={handleChange}
          error={errors.email}
          disabled={loading}
        />
        <Input
          id="register-password"
          name="password"
          label="Password"
          value={values.password}
          onchange={handleChange}
          error={errors.password}
          disabled={loading}
        />
        <Button type="submit" fullwidth loading={loading} disabled={loading}>
          Create Account
        </Button>
      </form>

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
      >
        Continue with Google
      </Button>
      <p className="text-gray-400 text-center text-sm mt-6">
        Already have an account?{" "}
        <span
          onClick={openLogin}
          className="text-primary hover:underline font-semibold cursor-pointer"
        >
          Login
        </span>
      </p>
    </Modal>
  );
};

export default RegisterModal;
