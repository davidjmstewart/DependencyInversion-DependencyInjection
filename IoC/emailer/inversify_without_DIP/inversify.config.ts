/*

This is the configuration file that tells inversify how to resolve dependencies.

*/

// Import all of the dependencies that inversify will use to inject
require('dotenv').config();
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./ioc_types";
import { emailService } from "./services/EmailService";
import { MailService } from "@sendgrid/mail";

let container = new Container();

container.bind<emailService>(TYPES.SendGridEmailer).to(emailService).inSingletonScope();

container.bind<MailService>(TYPES.SendGridMailService).to(MailService).inSingletonScope();

container.bind<string>(TYPES.SendGridKey).toConstantValue(process.env.SENDGRID_API_KEY!);

export default container;