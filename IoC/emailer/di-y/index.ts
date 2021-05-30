//Build with: npm run build
//After building, run with: npm start
//Make sure your API keys are set and you are using the correct email address

import { MailService as SendGridMailService } from "@sendgrid/mail";

require('dotenv').config();

interface IMessageOptions {
    html: string,
    to: string,
    from: string,
    subject: string
}


class emailService {

    private mailService: SendGridMailService;

    // Now we are performing constructor injection: we are giving the emailService
    // class its dependency of a SendGridMailService through its constructor
    // This is useful for usecases like testing: doing this allows us to inject a mock
    // SendGridMailService instance for unit testing
    constructor(apiKey: string, mailService: SendGridMailService) {
        this.mailService = mailService
        this.mailService.setApiKey(apiKey);
    }

    async sendEmail(messageOptions: IMessageOptions): Promise<any> {
        console.log(`Sending an email to ${messageOptions.to}`);
        return await this.mailService.send(messageOptions);
    }

}

const es = new emailService(process.env.SENDGRID_API_KEY!, new SendGridMailService());

es.sendEmail({
    to: 'recipient@recipient.com', // If you have a valid SendGrid API key and want to see a real email sent, change this to the recipient's address
    from: 'yoursendgridemail@address.com',  // If you have a valid SendGrid API key and want to see a real email sent, change this to the email address associated with your SendGrid account
    subject: 'Here is an email sent with a DIY flavour of Dependency Injection!',
    html: '<strong>🚫💉🚫💉🚫💉 This is using DI without a container framework</strong>',
})
    .then(() => console.log('Email sent'))
    .catch((e) => console.error(e));