
import {  inject, injectable } from "inversify";
import { TYPES } from "../ioc_types";
import * as mailjet from "node-mailjet"

// A key difference between the MailJet API and the SendGrid API is that the SendGrid API
// allows us to inject their client (called MailService in their library) without specifying the API keys,
// meaning we can set the API keys in the constructor of our wrapper class. MailJet returns the client once
// the correct public and private keys have been set, so we need to provide inversify the instructions
// for correctly creating a client object that we can then inject into our wrapper class (MailJetEmailer) that extends
// IEmailService

@injectable()
export class MailJetEmailClient {

    private client: mailjet.Email.Client;

    constructor(
        @inject(TYPES.MailJetPublicKey) publicKey: string,
        @inject(TYPES.MailJetPrivateKey) privateKey: string
    ) {
        this.client = mailjet.connect(publicKey, privateKey);    
    }

    public getClient(): mailjet.Email.Client {
        return this.client;
    }

}