import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log(req.signedCookies);
  if (req.cookies["cookie"] && req.cookies["cookie"] === "monster")
    return res.status(200).send([
      {
        id: 1,
        name: "Oraimo Airpods 3C",
        age: 12.99,
      },
    ]);
  return res.status(403).send({
    msg: "Sorry you need the correct cookie",
  });
});

export default router;
