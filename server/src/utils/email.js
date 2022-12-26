import nodemailer from 'nodemailer';
import * as path from 'path';

import { config } from '../configs/email';
import logger from '../configs/logger';

import { templateMap } from '../templates';
import ejs from 'ejs';

var transport = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  auth: {
    user: config.user,
    pass: config.pass,
  },
});

const sendMail = (to, subject, bodyParams) => {
  const template = bodyParams?.template;
  const params = bodyParams?.params;
  if (templateMap[template] !== undefined) {
    const templateFilePath = path.join(
      __dirname,
      '..',
      'templates',
      `${templateMap[template]}.ejs`
    );
    console.log('templateFilePath', templateFilePath);
    console.log('params', params);
    ejs.renderFile(templateFilePath, { ...params }, (err, data) => {
      if (err) {
        console.log(err);
        logger.error('Error forming template,', err.message);
        return;
      }
      const mailOptions = {};
      mailOptions['from'] = 'expensemanager <hi@jalpenshah.com>';
      mailOptions['to'] = to;
      mailOptions['subject'] = subject;
      mailOptions['html'] = data;
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return logger.error(error);
        }
        logger.error('Email sent: %s', info.messageId);
      });
    });
  }
};

export { sendMail };
