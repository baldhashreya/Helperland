import { ContactUs } from "../models/contactus";
import { ContactUsRepository } from "./repository";

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

    public async updateContactUS(contactus: ContactUs, id: number): Promise<[ContactUs[]]> {
        return this.contactusRepository.updateContactUs(contactus, id);
    }

    public async deleteContactUs(id: number): Promise<number> {
        return this.contactusRepository.deleteContactUs(id);
    }
}