import  {dbContact} from "../models/index";
import { ContactUs } from "../models/contactus";

export class ContactUsRepository{
    
    public async createContactUs(contactus: ContactUs): Promise<ContactUs> {
        return dbContact.ContactUs.create(contactus);
    }
}