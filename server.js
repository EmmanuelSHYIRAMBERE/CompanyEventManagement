import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import morgan from "morgan";
import systemRouter from "./routes";

const app = express();
const port = process.env.PORT;

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Event-Management-Platform API Documentation",
      version: "1.0.0",
      description:
        "This Event-Management-Platform API Documentation is designed to provide basics of how this API functions.",
    },
    servers: [
      {
        url: "http://localhost:7000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api", systemRouter);
app.use("/uploads", express.static("event_images"));

mongoose
  .connect(process.env.DB_connect_devs)
  .then((res) => {
    console.log(`connected to mongo DB`);
    app.listen(port, () =>
      console.log(
        `Event-Management-Platform is running on port http://localhost:${port}`
      )
    );
  })
  .catch((error) => {
    console.log(error);
  });
