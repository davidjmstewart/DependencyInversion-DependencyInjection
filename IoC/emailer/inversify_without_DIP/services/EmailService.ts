import { MailDataRequired, MailService } from "@sendgrid/mail";
import { decorate, inject, injectable } from "inversify";
import { TYPES } from "../ioc_types";

// Necessary because we are trying to make 3rd party code injectable, but it is not decorated with the @injectable decorator
// https://github.com/inversify/InversifyJS/issues/297
decorate(injectable(), MailService);

@injectable()
export class emailService {

    private mailService: MailService;

    // we are doing constructor injection with inversify, but we are still violating the dependency inversion principle
    constructor(
        @inject(TYPES.SendGridKey) apiKey: string,
        @inject(TYPES.SendGridMailService) mailService: MailService) {
        this.mailService = mailService
        this.mailService.setApiKey(apiKey);
    }

    async send(messageOptions: MailDataRequired): Promise<any> {
        console.log(`Sending an email to ${messageOptions.to} using the SendGrid API`);
        return await this.mailService.send(messageOptions);
    }

}