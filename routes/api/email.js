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

// TODO: change from http to https when  actually linking to a real site

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
      const url = `http://localhost:8888/api/confirm/${emailToken}`;
      async.parallel(
        [
          function(callback) {
            sendEmail(
              callback,
              'noreply@fira.app',
              [`${req.body.email}`],
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

// TODO: change the redirect route and add a confirmed message maybe. Or redirect to a confirmed page.
router.get('/:id', (req, res) => {
  jwt.verify(req.params.id, process.env.EMAIL_SECRET, (err, decoded) => {
    User.update({ confirmed: true }, { where: { id: decoded.data } }).then(
      user => {
        res.redirect('http://localhost:3000/');
      }
    );
  });
});

module.exports = router;
