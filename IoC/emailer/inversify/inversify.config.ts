/*

This is the configuration file that tells inversify how to resolve dependencies.

*/

// Import all of the dependencies that inversify will use to inject
require('dotenv').config();
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./ioc_types";
import { SendGridEmailer } from "./services/SendGridEmailer";
import { MailService } from "@sendgrid/mail";
import { MailJetEmailer } from "./services/MailJetEmailer";
import { MailJetEmailClient } from "./services/MailJetEmailClient";
import { ApplicationEmailer } from "./services/ApplicationEmailer";

let container = new Container();


// SENDGRID

// When something in our codebase asks for a SendGridEmailer (identified by TYPES.SendGridEmailer)
// contstruct a SendGridEmailer as a singleton. Any further requests for a SendGridEmailer will receive
// the same instance that was initially constructed
container.bind<SendGridEmailer>(TYPES.SendGridEmailer).to(SendGridEmailer).inSingletonScope();

// Our SendGridEmailer (in services/SendGridEmailer.ts) says, in its constructor, that it expects
// something of type MailService. This line ensures that inversijfy will inject a MailService
// whenever a SendGridEmailer is constructed. If you were running tests, you would instead
// probably do something like binding to a MockMailService instead of the actual mail service
// so that actual emails don't get sent from your test suites
container.bind<MailService>(TYPES.SendGridMailService).to(MailService).inSingletonScope();

container.bind<string>(TYPES.SendGridKey).toConstantValue(process.env.SENDGRID_API_KEY!);

// MAILJET
container.bind<string>(TYPES.MailJetPublicKey).toConstantValue(process.env.MJ_APIKEY_PUBLIC!);
container.bind<string>(TYPES.MailJetPrivateKey).toConstantValue(process.env.MJ_APIKEY_PRIVATE!);
container.bind<MailJetEmailer>(TYPES.MailJetEmailer).to(MailJetEmailer).inSingletonScope();
container.bind<MailJetEmailClient>(TYPES.MailJetClient).to(MailJetEmailClient).inSingletonScope();

// Bindings for our ApplicationEmailer: our class that can have any IEmailService injected into it
if (process.env.PRODUCTION_EMAIL_PROVIDER == "SENDGRID") {
    container.bind<SendGridEmailer>(TYPES.MailService).to(SendGridEmailer).inSingletonScope();
} else { // anything other than SENDGRID will be treated as MAILJET for this example
    container.bind<MailJetEmailer>(TYPES.MailService).to(MailJetEmailer).inSingletonScope();
}

container.bind<ApplicationEmailer>(TYPES.ApplicationEmailer).to(ApplicationEmailer).inSingletonScope();

export default container;