const helper = require('sendgrid').mail;
const async = require('async');
const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

function sendEmail(
  parentCallback,
  fromEmail,
  toEmails,
  subject,
  textContent,
  htmlContent
) {
  const errorEmails = [];
  const successfulEmails = [];
  const sg = require('sendgrid')(process.env.SG_KEY);
  async.parallel(
    [
      function(callback) {
        // Add to emails
        for (let i = 0; i < toEmails.length; i += 1) {
          // Add from emails
          const senderEmail = new helper.Email(fromEmail);
          // Add to email
          const toEmail = new helper.Email(toEmails[i]);
          // HTML Content
          const content = new helper.Content('text/html', htmlContent);
          const mail = new helper.Mail(senderEmail, subject, toEmail, content);
          const request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
          });
          sg.API(request, (error, response) => {
            console.log('SendGrid');
            if (error) {
              console.log('Error response received');
            }
          });
        }
        // return
        callback(null, true);
      }
    ],
    (err, results) => {
      console.log('Done');
    }
  );
  parentCallback(null, {
    successfulEmails,
    errorEmails
  });
}

// TODO: import sq and user etc

// // hash the password and create a user with the hashed password
// if (!userTaken && !emailTaken) {
//   return bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//       if (err) throw err;
//       password = hash;
//       email = email.toLowerCase();
//       User.create({
//         username,
//         email,
//         password
//       })

router.post('/', (req, res) => {
  console.log(req.body);
  bcrypt.genSalt(8, (err, salt) => {
    bcrypt.hash(req.body.id.toString(), salt, (err, hash) => {
      async.parallel(
        [
          function(callback) {
            sendEmail(
              callback,
              'noreply@fira.app',
              ['spdevuk@gmail.com'],
              'Subject Line',
              'Text Content',
              `<p style="font-size: 32px;">Please ${hash}lick this link to auth your account:</p>`
            );
          }
        ],
        (err, results) => {
          res.send({
            success: true,
            message: 'Emails sent',
            successfulEmails: results[0].successfulEmails,
            errorEmails: results[0].errorEmails
          });
        }
      );
    });
  });
});

module.exports = router;
