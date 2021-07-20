import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { usersRoutes } from "./routes/users.routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/users", usersRoutes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error && err.message === "User already exists!") {
      return response.status(400).json({
        error: err.message,
      });
    }

    if (err instanceof Error && err.message === "User is not an admin!") {
      return response.status(400).json({
        error: err.message,
      });
    }

    if (err instanceof Error && err.message === "User not found!") {
      return response.status(404).json({
        error: err.message,
      });
    }

    if (
      err instanceof Error &&
      err.message === "Can't list to a user that don't exists!"
    ) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
);

export { app };
