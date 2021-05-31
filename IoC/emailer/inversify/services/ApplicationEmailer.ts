import { IEmailService, IMessageOptions } from "../interfaces";
import { inject, injectable } from "inversify";
import { TYPES } from "../ioc_types";

// This is a wrapper class of our wrapper classes: it can take any IEmailService
// as a dependency. See the inversify.config.ts file to see how the email service we will
// end up using at runtime gets injected
@injectable()
export class ApplicationEmailer {

    private mailService: IEmailService;

    constructor(
        @inject(TYPES.MailService) mailService: IEmailService) {
        this.mailService = mailService;
    }

    async send(messageOptions: IMessageOptions): Promise<any> {
        console.log(`Sending an email to ${messageOptions.to} using whatever email service has been injected into the ApplicationEmailer class`);

        return await this.mailService.sendEmail(messageOptions);
    }

}