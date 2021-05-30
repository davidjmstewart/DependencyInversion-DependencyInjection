//Install modules:  npm install
//Build with:       npm run build
//Run with:         npm start
//Make sure your API keys are set in .env and you are using the correct email address

import { TYPES } from "./ioc_types";
import container from "./inversify.config";
import { emailService } from "services/EmailService";

require('dotenv').config();

let sg_emailer = container.get<emailService>(TYPES.SendGridEmailer);

sg_emailer.send({
    to: 'davidjmstewart@gmail.com', // If you have a valid SendGrid API key and want to see a real email sent, change this to the recipient's address
    from: 'setnet@creativelighting.com.au',  // If you have a valid SendGrid API key and want to see a real email sent, change this to the email address associated with your SendGrid account
    subject: 'Here is an email constructed with Inversify and sent with SendGrid',
    html: '<strong>💉💉💉 This is using the inversify framework, but is not using dependency inversion! Sent using the SendGrid API</strong>',
})
    .then(() => console.log('Email sent using SendGrid'))
    .catch((e) => console.error(e));