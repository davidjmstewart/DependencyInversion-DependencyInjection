//Install modules:  npm install
//Build with:       npm run build
//Run with:         npm start
//Make sure your API keys are set in .env and you are using the correct email address

import { MailService as SendGridMailService } from "@sendgrid/mail";

require('dotenv').config();

interface IMessageOptions {
    html: string,
    to: string,
    from: string,
    subject: string
}

// This is the base example we start from with the goal of decoupling
// from the concrete dependencies using a combination of the dependency inversion principle
// and dependency injection. 
class emailService {

    private mailService: SendGridMailService; // ideally, this would be an interface but it does not appear that SendGrid expose this as an interface

    constructor(apiKey: string) {
        this.mailService = new SendGridMailService(); // we have a dependency on a concrete object: the SendGrid MailService
        this.mailService.setApiKey(apiKey);
    }

    async sendEmail(messageOptions: IMessageOptions): Promise<any> {
        console.log(`Sending an email to ${messageOptions.to}`);
        return await this.mailService.send(messageOptions);
    }

}

// If you want to send an email, make sure you set your SENDGRID_API_KEY in the .env file
const es = new emailService(process.env.SENDGRID_API_KEY!);

es.sendEmail({
    to: 'recipient@recipient.com', // If you have a valid SendGrid API key and want to see a real email sent, change this to the recipient's address
    from: 'yoursendgridemail@address.com',  // If you have a valid SendGrid API key and want to see a real email sent, change this to the email address associated with your SendGrid account
    subject: 'Here is an email sent with a hardcoded dependency on the SendGrid library',
    html: '<strong>🚫💉🚫💉🚫💉No injection yet. We will look at this next!</strong>',
})
    .then(() => console.log('Email sent'))
    .catch((e) => console.error(e));