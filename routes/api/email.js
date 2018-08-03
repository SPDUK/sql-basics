const helper = require('sendgrid').mail;
const async = require('async');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sq = require('../../models/sq');
const User = require('../../models/User');

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

// set up a JWT that will expire after 1 hour
router.post('/', (req, res) => {
  // console.log(req.body);
  jwt.sign(
    {
      data: req.body.id
    },
    process.env.EMAIL_SECRET,
    { expiresIn: '1h' },
    (err, emailToken) => {
      const url = `https://localhost:8888/api/confirm/${emailToken}`;
      async.parallel(
        [
          function(callback) {
            sendEmail(
              callback,
              'noreply@fira.app',
              ['spdevuk@gmail.com'],
              'Subject Line',
              'Text Content',
              `<a href="${url}"> <p style="font-size: 32px;">Please click this link to verify your <strong>account</strong></p>${url}</a>`
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
      if (err) {
        return res.status(404).json(err);
      }
    }
  );
});
// create a token from the id
// send that token to the id
// decrypt it in the get route, if they match then verify the user in db

// using a wildcard because bcrypt strings come with / in it and I don't know how to remove it
// TODO: remove / from bcrypt or something.
router.get('/:id', (req, res) => {
  res.send('hi');
  jwt.verify(req.params.id, process.env.EMAIL_SECRET, (err, decoded) => {
    console.log(decoded);
    User.update({ confirmed: true }, { where: { id: decoded.data } }).then(
      user => {
        console.log(user);
      }
    );
  });
});

module.exports = router;
