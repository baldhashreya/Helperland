import { Request, Response } from 'express';
import { ContactUs  } from "../models/contactus";
import { user_id } from '../User/encrypt';
import { ContactUsService } from "./service";

export class ContactUsController {
    public constructor(private readonly contactusService: ContactUsService) {
      this.contactusService = contactusService;
    }

    public createContactUs = async (req: Request, res: Response): Promise<Response> => {

      if(req.file === undefined){
        return res.json("file formate not support");
      }
      req.body.Name = req.body.firstName + " " + req.body.lastName;
      const id = user_id(req.cookies.helperland);
      if(id != undefined){
        req.body.CreatedBy =  id;
      }
      req.body.fileName = req.file.originalname;
      return this.contactusService
        .createContactUs(req.body)
        .then((contactus: ContactUs) => {
          contactus.update({status:0,isDeleted:false});
          if(req.file){
            this.contactusService
              .uploadFileName(contactus.Name,req.file.originalname)
          }
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
      this.contactusService
        .getContactUsById(+req.params.id)
        .then((contactus)=>{
          if(contactus == null){
            return res.status(401).json("Something Wrong");
          }
          else{
            if(req.body.firstName == undefined && req.body.lastName == undefined){
              req.body.Name = contactus.Name;
            }
            else if(req.body.firstName != undefined && req.body.lastName != undefined){
              req.body.Name = req.body.firstName + " " + req.body.lastName;
            }
            else{
              const name = (contactus.Name).split(" ");
              req.body.Name = req.body.firstName == undefined ? name[0] + " " + req.body.lastName : req.body.firstName + " " + name[1];
            }
          }
        })
      return this.contactusService
        .updateContactUS(req.body,+req.params.id)
        .then((contactus) => {
         return res.status(200).send('update');
        })
        .catch((error: Error) => {
          console.log(error);
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
          console.log(error);
          return res.status(500).json({
            error: error
          });
        });
    };
}