import { Request, Response } from 'express';
import { ContactUs  } from "../models/contactus";
import { ContactUsService } from "./service";

export class ContactUsController {
    public constructor(private readonly contactusService: ContactUsService) {
      this.contactusService = contactusService;
    }

    public createContactUs = async (req: Request, res: Response): Promise<Response> => {
        return this.contactusService
          .createContactUs(req.body)
          .then((contactus: ContactUs) => {
            return res.status(200).json({ contactus });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      };
}