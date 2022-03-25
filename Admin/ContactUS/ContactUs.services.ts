import { ContactUs } from "../../models/contactus";
import { ContactUsAttachment } from "../../models/contactusattachment";
import { ContactUsRepository } from "./ContactUs.repository";

export class ContactUsService{
    public constructor(private readonly contactusRepository: ContactUsRepository) {
        this.contactusRepository = contactusRepository;
    }


    public async createContactUs(contactus: ContactUs): Promise<ContactUs> {
        return this.contactusRepository.createContactUs(contactus);
    }

    public async getContactUsById(id: number): Promise<ContactUs | null> {
        return this.contactusRepository.getContactUsById(id);
    }

    public async getContactUs(): Promise<ContactUs[]> {
        return this.contactusRepository.getContactUs();
    }

    public async updateContactUS(contactus: ContactUs, id: number): Promise<[number,ContactUs[]]> {
        return this.contactusRepository.updateContactUs(contactus, id);
    }

    public async deleteContactUs(id: number): Promise<number> {
        return this.contactusRepository.deleteContactUs(id);
    }

    public async uploadFileName(name:string, filename: string, id: number):Promise<ContactUsAttachment>{
        return this.contactusRepository.uploadFileName(name,filename,id);
    }

    public async findUploadfile(id:number): Promise<ContactUsAttachment | null>{
        return  this.contactusRepository.findUploadfile(id);
    }

}