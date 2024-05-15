// Import the express library
import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";

// Create an instance of express
const app = express();

// Set the port number
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "password",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(routes);

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  req.session.visited = true;
  res.cookie("cookie", "monster", {
    maxAge: 6000 * 20 * 60,
    // signed: true,
  });
  res.send({ msg: "Hello Express" });
});

app.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const foundUser = mockUsers.find((user) => user.username === username);
  if (!foundUser || foundUser.password !== password)
    return res.status(401).send({ msg: "Bad Credentials" });
  req.session.user = foundUser;
  return res.status(200).send(foundUser);
});

app.get("/api/auth/status", (req, res) => {
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "Unauthenticated" });
});

// HTTP is stateless

// Start the server
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
