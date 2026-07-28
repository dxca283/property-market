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
    if (!session?.user?.id) return;

    const onConnect = () => {
      console.log("Connected", socket.id);
      socket.emit("join-user", session.user.id);
    };

    const onDisconnect = () => {
      console.log("Disconnected");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.connect();

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [session?.user?.id]);

  return children;
}