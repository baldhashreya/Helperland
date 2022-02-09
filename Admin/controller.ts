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
            contactus.update({status:0});
            return res.status(200).json({ contactus });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
    };

    public getContactUs = async (req: Request, res: Response): Promise<Response> => {
      return this.contactusService
        .getContactUs()
        .then((contactus: ContactUs[]) => {
          return res.status(200).json({ contactus });
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
        });
    };

    public getContactUsById = async (req: Request, res: Response): Promise<Response> => {
      return this.contactusService
        .getContactUsById(+req.params.id)
        .then((contactus) => {
          if (contactus) {
            return res.status(200).json({ contactus });
          }
          return res.status(404).json({ error: 'NotFound' });
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
        });
    };
  
    public updateContactUs = async (req: Request, res: Response): Promise<Response> => {
      return this.contactusService
        .updateContactUS(req.body,+req.params.id)
        .then((contactus) => {
            return res.status(200).send('update data');
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
        });
    };
  
    public deleteContactUs = async (req: Request, res: Response): Promise<Response> => {
      return this.contactusService
        .deleteContactUs(+req.params.id)
        .then((contactus) => {
          if (contactus > 0) {
            return res.status(200).json('Delete Data');
          }
          return res.status(404).json({ error: 'NotFound' });
        })
        .catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
        });
    };
}
