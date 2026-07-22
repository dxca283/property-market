import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.post("/events/message", (req, res) => {
  const { conversation, message, senderId } = req.body;

  console.log("🔥 Emit message", conversation.id);

  // Chỉ những ai đang mở conversation này mới nhận message realtime
  io.to(`conversation:${conversation.id}`).emit("message:new", {
    message,
    senderId,
  });

  console.log("🔥 Conversation Updated", conversation.id);

  const receiverId =
    senderId === conversation.buyerId
      ? conversation.sellerId
      : conversation.buyerId;

  io.to(`user:${receiverId}`).emit("conversations:update", conversation);

  res.json({
    success: true,
  });
});

io.on("connection", (socket) => {
  console.log(`✅ Connected: ${socket.id}`);

  socket.on("join-user", (userId: string) => {
    socket.join(`user:${userId}`);

    console.log(`${socket.id} joined user:${userId}`);
  });
  socket.on("join-conversation", (conversationId: string) => {
    const room = `conversation:${conversationId}`;

    socket.join(room);

    console.log(`${socket.id} joined ${room}`);
  });

  socket.on("leave-conversation", (conversationId: string) => {
    const room = `conversation:${conversationId}`;

    socket.leave(room);

    console.log(`${socket.id} left ${room}`);
  });
  socket.on("disconnect", () => {
    console.log(`❌ Disconnected: ${socket.id}`);
  });
});

httpServer.listen(4000, () => {
  console.log("🚀 Socket Server running on http://localhost:4000");
});
