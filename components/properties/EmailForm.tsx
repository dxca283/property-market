"use client";
import Image from "next/image";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LuSend } from "react-icons/lu";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";

interface InputValues {
  email: string;
  name: string;
  phone: string;
  message: string;
}
interface EmailFormProps {
  name: string;
  image: string;
  email: string;
  propertyTitle: string;
  propertyPrice: number;
}

const EmailForm = ({
  name,
  image,
  email,
  propertyTitle,
  propertyPrice,
}: EmailFormProps) => {
  const t = useTranslations("toast");
  const t2 = useTranslations("property");
  const t3 = useTranslations("email");
  const [values, setValues] = useState<InputValues>({
    email: "",
    name: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const sendMail = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!values.email || !values.name || !values.phone || !values.message) {
      toast.error(t("allFieldsRequired"));
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/send-mail", {
        ownerEmail: email,
        ownerName: name,
        propertyTitle,
        propertyPrice,
        senderEmail: values.email,
        senderName: values.name,
        message: values.message,
        senderPhone: values.phone
      })
      toast.success(t("emailSent"));
      setValues({
        email: "",
        name: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error(error);
      toast.error(t("emailFailed"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={sendMail} className="sticky top-28 rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt="User"
            width={50}
            height={50}
            className="object-cover rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold text-text">{name}</h3>
            <p className="text-text/60 ">{t2("agent")}</p>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <Input
            onchange={handleChange}
            id="contact-name"
            label={t3("yourName")}
            name="name"
            value={values.name}
          />
          <Input
            onchange={handleChange}
            id="contact-email"
            label={t3("yourEmail")}
            name="email"
            value={values.email}
          />
          <Input
            onchange={handleChange}
            id="contact-phone"
            label={t3("yourPhone")}
            name="phone"
            value={values.phone}
          />
          <Input
            onchange={handleChange}
            id="contact-message"
            label={t3("yourMessage")}
            name="message"
            as="textarea"
            value={values.message}
          />
        </div>
        <Button
        loading={loading}
          icon={<LuSend />}
          iconPosition="right"
          className="mt-3"
          fullwidth

        >
          {t3("sendEmail")}
        </Button>
      </form>
    </div>
  );
};

export default EmailForm;
