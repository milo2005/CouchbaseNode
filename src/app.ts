import * as express from "express";
import { Request, Response } from "express";
import * as compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as dotenv from "dotenv";
import * as path from "path";
import * as expressValidator from "express-validator";
import * as cors from "cors";

dotenv.config({ path: ".env.example" });

import users from "./routes/users";
import words from "./routes/words";
import { DBConnection } from "./services/db-connection";



// Create Express server
const app = express();
app.use(cors());

DBConnection.instance;

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use("public", express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));


/**
 * Primary app routes.
 */
app.use("/api/v1/users", users);
app.use("/api/v1/words", words);


app.use((req, res, next) => {
  const err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {

  app.use((error: any, req: Request, res: Response, next: () => void) => {
    res.status(error.status || 500);
    res.render("error", {
      message: error.message,
      error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((error: any, req: Request, res: Response, next: () => void) => {
  res.status(error.status || 500);
  res.render("error", {
    message: error.message,
    error: {}
  });
});

module.exports = app;