# DependencyInversion-DependencyInjection

Code examples to complement the report submitted for CAB402 (Programming Paradigms), Semester 1 2021. 

# Emailer code

The email example has 4 working examples in [IoC/emailer](https://github.com/davidjmstewart/DependencyInversion-DependencyInjection/tree/main/IoC/emailer):

1. [The "standard" implementation](https://github.com/davidjmstewart/DependencyInversion-DependencyInjection/tree/main/IoC/emailer/without_ioc) that uses a tightly coupled dependency, and no dependency injection;
2. [Manual dependency injection](https://github.com/davidjmstewart/DependencyInversion-DependencyInjection/tree/main/IoC/emailer/di-y) that shows a simple dependency injection example by passing the SendGrid email client to a class constructor;
3. [An IoC container example](https://github.com/davidjmstewart/DependencyInversion-DependencyInjection/tree/main/IoC/emailer/inversify_without_DIP) that does not adhere to dependency inversion, showing the basic mechanics of setting up an IoC container for a single class; and
4. [The final example](https://github.com/davidjmstewart/DependencyInversion-DependencyInjection/tree/main/IoC/emailer/inversify) that uses an IoC container and the dependency inversion principle to create interchangeable emailer classes

## Running the emailer code

Regardless of which of the emailer projects you are running, the steps are the same:

1. Navigate to the project directory, where the relevant `package.json` is;
2. `npm install` to install the project dependencies
3. `npm run build` to compile the TypeScript code to JavaScript
4. `npm start` to run the built code

## API Keys
You will  need to get the relevant API keys and put them in the `.env` files (each of the projects has its own `.env` file with the API key placeholders marked out for you). The projects use [SendGrid](https://sendgrid.com/) and [MailJet](https://www.mailjet.com/). These providers offer a free service that does not require any credit card information to be stored before you can use their API. 

Keep note of which email address you use to sign up for the APIs: there is a placeholder comment in each project's `index.ts` file that marks where you'll need to add this address: it's not sufficient to only have the API key, you must also provide the email address that matches the email address you used to get the keys. 
