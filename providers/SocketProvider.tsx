"use client";

import { authClient } from "@/lib/auth-client";
import { socket } from "@/lib/socket";
import { useEffect } from "react";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = authClient.useSession();
  useEffect(() => {
    if (!session?.user.id) return;
    socket.connect();
    socket.emit("join-user", session.user.id)

    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
