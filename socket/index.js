import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
const server = http.createServer(app);

// ✅ io was commented out — uncomment it
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";
const io = new Server(server, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from socket server!");
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId }); // ✅ was: user.push((userId, socketId)) — wrong variable + wrong syntax
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  // ✅ typo: reeceiverId → receiverId
  return users.find((user) => user.userId === receiverId); // ✅ was: user.find + user.user (wrong)
};

const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  const messages = {};

  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images }); // ✅ was: textx typo

    const user = getUser(receiverId);

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message); // ✅ was: .push[message] — brackets not parens
    }

    if (user) {
      // ✅ guard in case user not found
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId,
      );
      if (message) {
        message.seen = true;
        if (user) {
          // ✅ guard in case user not found
          io.to(user.socketId).emit("messageSeen", {
            senderId,
            receiverId,
            messageId,
          });
        }
      }
    }
  });

  // ✅ removed duplicate messageSeen handler

  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", { lastMessage, lastMessageId });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
