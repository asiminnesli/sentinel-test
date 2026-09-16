import { Router, Request, Response } from "express";
import { UserService } from "./user.service";

export function createUserRouter(userService: UserService): Router {
  const router = Router();

  // GET /users
  router.get("/", async (_req: Request, res: Response) => {
    try {
      const users = await userService.getUsers();
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // GET /users/:id
  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const user = await userService.getUserById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  return router;
}
