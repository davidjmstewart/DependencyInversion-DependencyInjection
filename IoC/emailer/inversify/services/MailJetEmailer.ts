import { IEmailService, IMessageOptions } from "../interfaces";
import {  inject, injectable } from "inversify";
import { TYPES } from "../ioc_types";
import { Email as MailJetEmail }from "node-mailjet"
import { MailJetEmailClient } from "./MailJetEmailClient";

@injectable()
export class MailJetEmailer implements IEmailService {

    private mailClient: MailJetEmail.Client;

    constructor(
        @inject(TYPES.MailJetClient) mailClient: MailJetEmailClient) {
        this.mailClient = mailClient.getClient();
    }

    async sendEmail(messageOptions: IMessageOptions): Promise<any> {
        console.log(`Sending an email to ${messageOptions.to} using the MailJet API`);
        return await this.mailClient.post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": messageOptions.from
                        },
                        "To": [
                            {
                                "Email": messageOptions.to
                            }
                        ],
                        "Subject": messageOptions.subject,
                        "HTMLPart": messageOptions.html,
                    }
                ]
            })
    }

}