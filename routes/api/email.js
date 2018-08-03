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
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
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

router.post('/', (req, res) => {
  console.log(req.body);
  console.log(res.body);
  // const hashedID = bcrypt.genSalt(8, (err, salt) => {
  //   bcrypt.hash(req.body.id, salt, (err, hash) => {
  //     console.log(req.body);
  //     console.log(hashedID);
  //   });
  // });
  async.parallel(
    [
      function(callback) {
        sendEmail(
          callback,
          'noreply@fira.app',
          ['emailgoeshere@gmail.com'],
          'Subject Line',
          'Text Content',
          '<p style="font-size: 32px;">Please click this link to auth your account:</p>'
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

module.exports = router;
