const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');

let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'The BlogApp',
        link: 'https://mailgen.js/'
    }
});

let config = {
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    }
};

const transporter = nodemailer.createTransport(config);

const organizeRegistrationMail = (username) => {
    const emailFmt = {
        body: {
            name: username,
            intro: 'Welcome to the blogapp! We\'re very excited to have you on board.',
            action: {
                instructions: 'To continue using the api, please click here to get verifed:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account and Login',
                    link: `${process.env.HOST_URL}/api-docs/#/Users/Login`
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };

    const emailBody = mailGenerator.generate(emailFmt);

    return emailBody;
}

const organizeResetPasswordMail = (username) => {
    const emailFmt = {
        body: {
            name: username,
            intro: 'You have received this email because a password reset request for your account was received.',
            action: {
                instructions: 'Click the button below to reset your password:',
                button: {
                    color: '#DC4D2F',
                    text: 'Reset your password',
                    link: `${process.env.HOST_URL}/api-docs/#/Users/ResetPassword`
                }
            },
            outro: 'If you did not request a password reset, no further action is required on your part.'
        }
    };

    const emailBody = mailGenerator.generate(emailFmt);

    return emailBody;
}

async function registrationMail(email, username) {

    const emailBody = organizeRegistrationMail(username)

    const message = {
        from: process.env.USERNAME,
        to: email,
        subject: "Welcome ✔",
        html: emailBody
    }

    const info = await transporter.sendMail(message);

    return info;
};

async function resetPasswordMail(email, username) {
    const emailBody = organizeResetPasswordMail(username);

    const message = {
        from: process.env.USERNAME,
        to: email,
        subject: "Password Reset ✔",
        text: emailBody
    }

    const info = await transporter.sendMail(message);

    return info;
};

module.exports = {
    registrationMail,
    resetPasswordMail
};