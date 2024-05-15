import { mockUsers } from "../utils/constants.mjs";

export const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedID = parseInt(id);
  // Checking if the user is an actual number
  if (isNaN(parsedID)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => {
    return user.id === parsedID;
  });
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};
