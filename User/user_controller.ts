import { Request, Response } from 'express';
import { Users  } from "../models/user";
import { UserService } from "./user_service";

export class UserController {
    public constructor(private readonly UserService: UserService) {
      this.UserService = UserService;
    }

    public createUser = async (req: Request, res: Response): Promise<Response> => {
        return this.UserService
          .createUser(req.body)
          .then((user: Users) => {
              console.log("data save");
            return res.status(200).json({ user });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      };
}