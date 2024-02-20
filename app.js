// Importing required modules
const nodemailer = require('nodemailer');
const readline = require('readline');
require('dotenv').config(); // Load environment variables
// Function to send email
function sendEmail(to, subject, body) {
    // Creating a Nodemailer transporter using Mail.ru SMTP details
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // Use SSL/TLS encryption
        auth: {
            user: '', // Mail.ru username
            pass: '' // Mail.ru password or app-specific password
        }
    });

    // Email message options
    let mailOptions = {
        from: '', // Sender address (must be your Mail.ru email address)
        to: to,
        subject: subject,
        text: body
    };

    // Sending email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error.message);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}

// Function to get email details from command line
function getEmailDetails() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Prompts for email details
    rl.question('Enter recipient email address: ', (to) => {
        rl.question('Enter email subject: ', (subject) => {
            rl.question('Enter email body: ', (body) => {
                // Close the readline interface
                rl.close();
                // Call sendEmail function with provided details
                sendEmail(to, subject, body);
            });
        });
    });
}

// Main function
function main() {
    // Call function to get email details from command line
    getEmailDetails();
}

// Call main function
main();
