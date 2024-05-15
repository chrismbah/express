import { Router } from "express";
import { validationResult, checkSchema, matchedData } from "express-validator";
import {
  queryValidationSchema,
  userValidationSchema,
} from "../utils/validationSchema.utils.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { resolveIndexByUserId } from "../middleware/resolveUserById.mjs";
const router = Router();

router.get("/", checkSchema(queryValidationSchema), (req, res) => {
  console.log(req.sessionID);
  req.sessionStore.get(req.sessionID, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({
      errors: result.array(),
    });
  const {
    query: { filter, value },
  } = req;
  if (filter && value)
    return res
      .status(200)
      .send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.status(200).send(mockUsers);
});

// GET /api/users/:id: Get a user by ID
router.get("/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const foundUser = mockUsers[findUserIndex];
  if (!foundUser) return res.sendStatus(404);
  return res.send(foundUser);
});

// POST /api/users: Create a new user
router.post("/", checkSchema(userValidationSchema), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({
      errors: result.array(),
    });

  const data = matchedData(req);
  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1 || 1,
    ...data,
  };
  mockUsers.push(newUser);
  return res.status(201).send(mockUsers);
});

// PUT /api/users/:id: Update a user by ID
router.put("/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  // Updating the found user object
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.status(200).send(mockUsers);
});

router.patch("/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.status(200).send(mockUsers);
});

router.delete("/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  res.status(200).send(mockUsers);
});
export default router;
