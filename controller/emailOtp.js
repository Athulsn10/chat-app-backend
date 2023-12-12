const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'teamchatify@gmail.com',
    pass: process.env.G_pass
  }
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const otpStorage = {};

const userOtp = asyncHandler(async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const otp = generateOTP();
  otpStorage[email] = otp;

  const mailOptions = {
    from: 'chatify',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`, 
    html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title></title>
      <style type="text/css">
        @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
          .u-row .u-col-100 {
            width: 600px !important;
          }
        }
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col > div {
            margin: 0 auto;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        p {
          margin: 0;
        }
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        * {
          line-height: inherit;
        }
        a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
        }
        table, td { color: #000000; }
      </style>
      <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">
    </head>
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <div class="u-row-container" style="padding: 0px;background-color: #f9f9f9">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Lato',sans-serif;" align="left">
                                  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                    <tbody>
                                      <tr style="vertical-align: top">
                                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                          <span>&#160;</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px;font-family:'Lato',sans-serif;" align="left">
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                      <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                        <img align="center" border="0" src="https://i.ibb.co/8rtN9CB/icon.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 29%;max-width: 168.2px;" width="168.2"/>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #161a39;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="background-color: #9439ef;height: 100%;width: 100% !important;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">
                                  <div style="font-size: 25px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%;">Welcome to chatify</p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="u-row-container" style="padding: 0px;background-color: transparent">
                <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                  <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                      <div style="height: 100%;width: 100% !important;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                          <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:'Lato',sans-serif;" align="left">
                                  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; color: #666666;">Hello,</span></p>
                                    <p style="font-size: 14px; line-height: 140%;"> </p>
                                    <p style="line-height: 140%;"><span style="color: #666666;"><span style="font-size: 18px; line-height: 25.2px;">your OTP is : <strong>${otp}</strong> </span></span></p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 0px;font-family:'Lato',sans-serif;" align="left">
                                  <div style="font-size: 14px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word;">
                                    <p style="line-height: 140%; font-size: 14px; text-align: center;"><span style="font-size: 14px; line-height: 19.6px; color: #000000;"><span style="font-size: 14px; line-height: 19.6px;"><span style="line-height: 19.6px; font-size: 14px;">Chatify ©  All Rights Reserved</span></span></span></p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
    `
  };

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email: ", error);
          reject(error);
        }
        resolve(info);
      });
    });

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.log("Error sending email: ", error);
    return res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const userOTP = req.body.otp;

  if (!email || !userOTP) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  const storedOTP = otpStorage[email];

  if (!storedOTP || storedOTP !== userOTP) {
    return res.status(401).json({ success: false, message: 'Invalid OTP' });
  }

  delete otpStorage[email];

  res.json({ success: true, message: 'OTP verified successfully' });
});

module.exports = { userOtp, verifyOtp };
