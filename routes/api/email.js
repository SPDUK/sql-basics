const helper = require('sendgrid').mail;
const async = require('async');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

router.post('/', (req, res) => {
  // jwt

  console.log(res.body);
  async.parallel(
    [
      function(callback) {
        sendEmail(
          callback,
          'noreply@fira.app',
          ['spdevuk@gmail.com'],
          'Subject Line',
          'Text Content',
          `<a href="http://localhost:8888/api/confirm/${hash}"> <p style="font-size: 32px;">Please click this link to verify your <strong>account</strong></p></a>`
        );
      }
    ],
    (err, results) => {
      if (err) console.log(err);
      res.send({
        success: true,
        message: 'Emails sent',
        successfulEmails: results[0].successfulEmails,
        errorEmails: results[0].errorEmails
      });
    }
  );
});

// using a wildcard because bcrypt strings come with / in it and I don't know how to remove it
// TODO: remove / from bcrypt or something.
router.get('/*', (req, res) => {
  res.send('hi');
  console.log(req.params);
  console.log('route hit');
});

module.exports = router;
