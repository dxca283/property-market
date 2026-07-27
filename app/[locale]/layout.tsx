import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import CreatePropertyModal from "@/components/modals/CreatePropertyModal";
import FilterModal from "@/components/modals/FilterModal";
import { Toaster } from "react-hot-toast";
import ContactSellerModal from "@/components/modals/ContactSellerModal";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}

      <RegisterModal />
      <LoginModal />
      <CreatePropertyModal />
      <FilterModal />
      <ContactSellerModal />

      <Toaster />
    </NextIntlClientProvider>
  );
}
