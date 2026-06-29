"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Modal from "./Modal";
import { registerSchema, RegisterValues } from "@/schemas/auth.schema";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";
import z from "zod";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { signinWithGoogle } from "@/services/SignInWithGoogle";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const RegisterModal = () => {
  const t = useTranslations("auth");
  const common = useTranslations("common");
  const { openLogin, closeRegister, isRegisterOpen } = useAuthStore();
  const router = useRouter();
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validation = registerSchema.safeParse(values);

    if (!validation.success) {
      setLoading(false);

      const tree = z.treeifyError(validation.error);

      setErrors({
        name: tree.properties?.name?.errors?.[0],
        email: tree.properties?.email?.errors?.[0],
        password: tree.properties?.password?.errors?.[0],
      });
      return;
    }

    // Register user
    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message as string);
        return;
      }
      toast.success("Account created successfully");
      closeRegister();
      setValues((prev) => ({
        ...prev,
        name: "",
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
    <Modal title="Register" onClose={closeRegister} isOpen={isRegisterOpen}>
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t("welcomePropertyMarketplace")}
        </h2>
        <p className="text-gray-600 text-sm">
          {t("registerDescription")}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          id="register-name"
          name="name"
          label={t("fullName")}
          value={values.name}
          onchange={handleChange}
          error={errors.name}
          disabled={loading}
        />
        <Input
          id="register-email"
          name="email"
          label={common("email")}
          value={values.email}
          onchange={handleChange}
          error={errors.email}
          disabled={loading}
        />
        <Input
          id="register-password"
          name="password"
          label={common("password")}
          value={values.password}
          onchange={handleChange}
          error={errors.password}
          disabled={loading}
        />
        <Button type="submit" fullwidth loading={loading} disabled={loading}>
          {t("createAccount")}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-500">{common("or")}</span>
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
        {t("continueWithGoogle")}
      </Button>
      <p className="text-gray-400 text-center text-sm mt-6">
        {t("alreadyHaveAccount")}{" "}
        <span
          onClick={openLogin}
          className="text-primary hover:underline font-semibold cursor-pointer"
        >
          {t("login")}
        </span>
      </p>
    </Modal>
  );
};

export default RegisterModal;
