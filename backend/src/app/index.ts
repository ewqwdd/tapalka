import "tsconfig-paths/register";
import express, { type Request, type Response } from "express";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import https from "https";
import { db } from "./utlis/postgres_connector";
import userController from "./controllers/userController";
import { morganMiddleware } from "./utlis/logger";
import tasksController from "./controllers/tasksController";
import { authorizeSocket } from "./middleware/authorizeSocket";
import { AuthenticatedSocket } from "./types/socket";
import { join } from "./socketHandlers/join";
import { rejoin } from "./socketHandlers/rejoin";
import { click } from "./socketHandlers/click";
import { kick } from "./socketHandlers/kick";
import { RedisRoom } from "./entitties/RedisRoom";
import roomController from "./controllers/roomController";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.DEV;

console.log("Port: " + port);
console.log("isDev: " + isDev);

app.use(morganMiddleware);

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "500mb" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hellodasd World!");
});

app.use("/user", userController);
app.use("/tasks", tasksController);
app.use("/room", roomController);
const server = isDev ? http.createServer(app) : https.createServer(app);

const io = new Server(server, {
  // options
  cors: {
    origin: "*",
  },
});

io.use(authorizeSocket).on("connection", (socket: AuthenticatedSocket) => {
  if (!socket.user) {
    socket.disconnect();
    return;
  }
  let roomId: string | undefined;
  let timeout: ReturnType<typeof setTimeout>;

  const kickTimeout = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (roomId) {
      timeout = setTimeout(async () => {
        const room = await RedisRoom.load(roomId ?? "");
        if (room?.status === "active") {
          socket.emit("5sec_alert");
          console.log(`alert is sent to ${socket.user?.id}`);
          timeout = setTimeout(async () => {
            const status = await kick(roomId ?? "", socket);
            if (status === "active") {
              console.log(`Player with id ${socket.user?.id} is kicked`);
              roomId = undefined;
            }
            kickTimeout();
          }, 10000);
        } else {
          kickTimeout();
        }
      }, 5000);
    }
  };

  socket.on("join", async () => {
    roomId = await join(socket);
    kickTimeout();
  });
  socket.on("rejoin", async (data) => {
    roomId = await rejoin(socket, data);
    kickTimeout();
  });
  socket.on("click", async () => {
    click(io, socket, roomId).then((data) => {
      roomId = data?.id;
      kickTimeout();
    });
  });
});

db.initialize()
  .then(() => {
    console.log("Postgres is initialized");
  })
  .catch((error) => console.log(error));

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
