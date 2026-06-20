"use client";
import Image from "next/image";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LuSend } from "react-icons/lu";

interface InputValues {
  email: string;
  name: string;
  phone: string;
  message: string;
}

const EmailForm = () => {
  const [values, setValues] = useState<InputValues>({
    email: "",
    name: "",
    phone: "",
    message: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <div className="sticky top-28 rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <Image
            src="/images/avatar.png"
            alt="User"
            width={50}
            height={50}
            className="object-cover rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold text-text">Peacemaker</h3>
            <p className="text-text/60 ">Property Agent</p>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <Input
            onchange={handleChange}
            id="contact-name"
            label="Your name"
            name="name"
            value={values.name}
          />
          <Input
            onchange={handleChange}
            id="contact-email"
            label="Your email"
            name="email"
            value={values.email}
          />
          <Input
            onchange={handleChange}
            id="contact-phone"
            label="Your phone"
            name="phone"
            value={values.phone}
          />
          <Input
            onchange={handleChange}
            id="contact-message"
            label="Your message"
            name="message"
            as="textarea"
            value={values.message}
          />
          
        </div>
        <Button icon={<LuSend />} iconPosition="right" className="mt-3" fullwidth>
          Send email
        </Button>
      </div>
    </div>
  );
};

export default EmailForm;
