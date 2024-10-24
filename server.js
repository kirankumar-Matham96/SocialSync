// package imports
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import swagger from "swagger-ui-express";
import fs from "fs";
import path from "path";
import cors from "cors";

// module imports
import { connectToDb } from "./src/config/mongoose.config.js";
import { auth } from "./src/middlewares/authorization/auth.middleware.js";
import { errorHandlingMiddleware } from "./src/middlewares/errorHandling/customErrorHandling.middleware.js";
import userRouter from "./src/features/user/routes/user.routes.js";
import postsRouter from "./src/features/posts/routes/post.routes.js";
import commentsRouter from "./src/features/comments/routes/comment.routes.js";
import likesRouter from "./src/features/likes/routes/like.routes.js";
import friendshipRouter from "./src/features/friendships/routes/friendship.routes.js";
import otpRouter from "./src/features/OTP/routes/otp.routes.js";
import unknownPathHandlerMiddleware from "./src/middlewares/404Handler/unknownPathHandler.middleware.js";

// setting the port number
const PORT = process.env.PORT || 8000;

// initializing express
const app = express();

// cors config
app.use(cors());

// reading swagger config file
const swaggerFilePath = path.join(path.resolve(), "swagger.json");
const apiDocs = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));

// swagger-docs api
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// setting up data parsers to read data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting cookie parser middleware to app level
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send(
    `
    <html>
      <head>
        <title>SocialSync API</title>
      </head>
      <body>
        <h1>Welcome to Social Sync API!</h1>
        <h2>
          Visit this for API Documentation: 
          <a href='https://socialsync-way3.onrender.com/api-docs/'>Swagger API-DOCS</a>
        </h2>
      </body>
    </html>`
  );
});
app.use("/api/users", userRouter);
app.use("/api/posts", auth, postsRouter);
app.use("/api/comments", auth, commentsRouter);
app.use("/api/likes", auth, likesRouter);
app.use("/api/friends", auth, friendshipRouter);
app.use("/api/otp", auth, otpRouter);

// 404 errors handling
app.use(unknownPathHandlerMiddleware);

// application level error handling
app.use(errorHandlingMiddleware);

// setting the listener
app.listen(PORT, () => {
  // connecting to the database
  connectToDb();
  console.log(`server is running at ${PORT}`);
});
