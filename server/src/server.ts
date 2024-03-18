import express from "express";
import { router } from "./router/router";
import cors from "cors";
import { AuthenticationDataBase } from "./database/mongodb";
async function BootStrap() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  AuthenticationDataBase();
  app.listen(8080, () => {
    console.log("🔥http server running");
  });
  app.use(router);
}

BootStrap();
