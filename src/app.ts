import express, { Application } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import router from "./atoms/router";
import { secrets, errorHandler } from "./utils";
import * as strategies from "./utils/auth";
import specs from "../openapi.json";

// Initialize the application
const app: Application = express();

// Security headers
app.use(helmet());

// Compress requests
app.use(compression());

// Parse incoming requests with JSON payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse incoming requests cookies
app.use(cookieParser(secrets.SECRET_KEY));

// Logging
const format =
  secrets.ENVIRONMENT === "development"
    ? "dev"
    : "[:date[clf]] :method :url :status :res[content-length] - :response-time ms";
app.use(morgan(format));

// Authentication
app.use(passport.initialize());
passport.use("jwt", strategies.jwtStrategy);
passport.use("jwt-tolerant", strategies.jwtStrategyTolerant);

// OpenAPI docs
if (secrets.ENVIRONMENT === "development") {
  app.use("/docs", swaggerUi.serve);
  app.get("/docs", swaggerUi.setup(specs));
}

// Routers
app.use(router);

// Error handler
app.use(errorHandler);

export default app;
