// this is an interface owned by a high level module that low level details must respect
// it doesn't matter which email provider we use in the codebase, the classes we use
// to send emails must be implemented in such a way that the email we wish to send
// takes the form of an IMessageOptions
export interface IMessageOptions {
    html: string,
    to: string,
    from: string,
    subject: string
}

// this is an interface owned by a high level module that low level details must implement
// we can make classes that implement this interface so that we can use providers like SendGrid
// or MailJet seamlessly
export interface IEmailService {
    sendEmail(messageOptions: IMessageOptions): Promise<any>;
}