import  {dbContact} from "../models/index";
import { ContactUs } from "../models/contactus";

export class ContactUsRepository{
    
    public async createContactUs(contactus: ContactUs): Promise<ContactUs> {
        return dbContact.ContactUs.create(contactus);
    }

    public async getContactUsById(id: number): Promise<ContactUs | null> {
        return dbContact.ContactUs.findOne({ where: {id: id}});
    }

    public async getContactUs(): Promise<ContactUs[]> {
        return dbContact.ContactUs.findAll();
    }

    public async updateContactUs(contactus: ContactUs, id: number): Promise<[ContactUs[]]> {
        return dbContact.ContactUs.update(contactus, { where: {id: id}});
    }

    public async deleteContactUs(id: number): Promise<number> {
        return dbContact.ContactUs.destroy({ where: {id: id}});  
    }
}