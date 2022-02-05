import { ContactUs } from "../models/contactus";
import { ContactUsRepository } from "./repository";

export class ContactUsService{
    public constructor(private readonly contactusRepository: ContactUsRepository) {
        this.contactusRepository = contactusRepository;
    }


    public async createContactUs(contactus: ContactUs): Promise<ContactUs> {
        return this.contactusRepository.createContactUs(contactus);
    }
}