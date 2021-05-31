//Install modules:  npm install
//Build with:       npm run build
//Run with:         npm start
//Make sure your API keys are set in .env and you are using the correct email address


import { TYPES } from "./ioc_types";
import container from "./inversify.config";
import { ApplicationEmailer } from "services/ApplicationEmailer";

require('dotenv').config();

//OPTION 1 - Construct the application emailer class that the inversify framework will properly construct
// with the correct wrapper class, based on the environment variables

const applicationEmailer: ApplicationEmailer = container.get<ApplicationEmailer>(TYPES.ApplicationEmailer);

applicationEmailer.send({
    to: 'davidjmstewart@gmail.com',
    from: 'setnet@creativelighting.com.au',
    subject: 'Here is an email constructed with Inversify, using the ApplicationEmailer class',
    html: '<strong>💉💉💉 This is using the inversify framework and complies with dependency inversion! Not sure which provider we are using, but we don\'t care! Check the console logs to see which email provider we used</strong>',
})
    .then(() => console.log('Email sent using the production provider and ApplicationEmailer class'))
    .catch((e) => console.error(e));


//OPTION 2 - Change the call to the container based on the environment variable  (remove block comments /* */ to run)

// construct an an emailer using the correct provider specified in an environment variable
// if you want to change to the MailJet provider, change PRODUCTION_EMAIL_PROVIDER in your .env file 
// technically anything other than SENDGRID as the value will result in MailJet being used

/*
const emailer: IEmailService = process.env.PRODUCTION_EMAIL_PROVIDER === 'SENDGRID' ? container.get<IEmailService>(TYPES.SendGridEmailer) : container.get<IEmailService>(TYPES.MailJetEmailer);

emailer.sendEmail({
    to: 'recipient@recipient.com', 
    from: 'your_email_that_matches_the_account_associated_with_your_api_keys@address.com',
    subject: 'Here is an email constructed with Inversify.',
    html: '<strong>💉💉💉 This is using the inversify framework and complies with dependency inversion! Not sure which provider we are using, but we don\'t care! Check the console logs to see which email provider we used</strong>',
})
    .then(() => console.log('Email sent using the production provider'))
    .catch((e) => console.error(e));

*/

//OPTION 3 - construct an emailers of both types (remove block comments /* */ to run)

/*
// we do not construct this object ourselves. Instead, we reach into the container and tell it we want
// a SendGridEmailer (the inversify.config file says that if we request a TYPES.SendGridEmailer, it should
// return an instance of the SendGridEmailer class). The inversify.config file is configured such that
// we only return a singleton: further calls of the form container.get<SendGridEmailer>(TYPES.SendGridEmailer); will
// return the same object that we are getting right now
let sg_emailer = container.get<IEmailService>(TYPES.SendGridEmailer);

sg_emailer.sendEmail({
    to: 'davidjmstewart@gmail.com', // If you have a valid SendGrid API key and want to see a real email sent, change this to the recipient's address
    from: 'setnet@creativelighting.com.au',  // If you have a valid SendGrid API key and want to see a real email sent, change this to the email address associated with your SendGrid account
    subject: 'Here is an email constructed with Inversify and sent with SendGrid',
    html: '<strong>💉💉💉 This is using the inversify framework and complies with dependency inversion! Sent using the SendGrid API</strong>',
})
    .then(() => console.log('Email sent using SendGrid'))
    .catch((e) => console.error(e));

let mj_emailer = container.get<IEmailService>(TYPES.MailJetEmailer);

mj_emailer.sendEmail({
    to: 'davidjmstewart@gmail.com', // If you have valid MailJet API keys and want to see a real email sent, change this to the recipient's address
    from: 'davidjmstewart@gmail.com',  // If you have valid MailJet API keys and want to see a real email sent, change this to the email address associated with your MailJet account
    subject: 'Here is an email constructed with Inversify and sent with MailJet',
    html: '<strong>💉💉💉 This is using the inversify framework and complies with dependency inversion! Sent using the MailJet API</strong>',
})
    .then(() => console.log('Email sent using MailJet'))
    .catch((e) => console.error(e));
*/