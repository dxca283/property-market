"use client";

import { Globe, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "../ui/Button";
import { localeOptions } from "@/contants/locales";

export default function LanguageSwitcher() {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (nextLocale: (typeof routing.locales)[number]) => {
    router.replace(pathname, {
      locale: nextLocale,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Globe className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        {localeOptions.map((item) => (
          <DropdownMenuItem
            key={item.code}
            onClick={() => changeLocale(item.code)}
            className="cursor-pointer"
          >
            <span className="mr-2">{item.flag}</span>

            <span>{item.label}</span>

            {locale === item.code && <Check className="ml-auto size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
