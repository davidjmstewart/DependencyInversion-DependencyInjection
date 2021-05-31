// JavaScript symbols are guaranteed to be unique, so they make convenient resource identifiers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
export const TYPES = {
    SendGridKey: Symbol("SendGridKey"),
    SendGridEmailer: Symbol("SendGridEmailer"),
    SendGridMailService: Symbol("SendGridMailService"),
    
    MailJetPublicKey: Symbol("MailJetPublicKey"),
    MailJetPrivateKey: Symbol("MailJetPrivateKey"),
    MailJetEmailer: Symbol("MailJetEmailer"),
    MailJetClient: Symbol("MailJetClient"),

    MailService: Symbol("MailService"),
    ApplicationEmailer: Symbol("ApplicationEmailer"),
};