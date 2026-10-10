"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { FaBell } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import Button from "../ui/Button";
import { useMarkNotificationRead } from "@/hooks/useMarkNotificationRead";
import { useMarkAllNotificationRead } from "@/hooks/useMarkAllNotificationRead";
import { useTranslations } from "next-intl";

export default function NotificationButton() {
  const { data: notifications } = useNotifications();
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAllRead } = useMarkAllNotificationRead();
  const t = useTranslations("common");

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative cursor-pointer">
          <FaBell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 max-h-96 overflow-y-auto"
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-black/5 dark:border-white/10">
          <span className="font-semibold text-sm">{t("notifications")}</span>
          {unreadCount > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                markAllRead();
              }}
              className="text-xs text-primary hover:underline cursor-pointer"
            >
              {t("markAllRead")}
            </button>
          )}
        </div>
        {!notifications || notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-text/70">
            {t("noNotifications")}
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start gap-1 p-3 cursor-pointer"
              onClick={() => {
                if (!notification.isRead) {
                  markRead(notification.id);
                }
              }}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-sm">
                  {notification.title}
                </span>
                {!notification.isRead && (
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                )}
              </div>
              <p className="text-xs text-text/70 line-clamp-2">
                {notification.message}
              </p>
              <span className="text-[10px] text-text/50">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
