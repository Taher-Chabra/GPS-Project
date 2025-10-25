import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import rateLimit from "express-rate-limit";

dotenv.config();

const app: Express = express();

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 5, // limit each IP to 5 requests per windowMs
  message: "Too many auth attempts, please try again after 5 minutes",
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 5 * 60 * 1000, // 5 minutes
    },
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// Routes import
import peopleRoutes from "./routes/people.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// Routes middleware
app.use("/api/people", authLimiter, peopleRoutes);

app.use(errorHandler);

export default app;
