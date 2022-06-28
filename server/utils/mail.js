//dotenv
require("dotenv").config();
// import nodemail & uuid
const nodemailer = require("nodemailer");
//const { v4: uuidv4 } = require("uuid");

//Simple OTP Generator for a One Time Passcode (OTP) Usage
exports.generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randValue = Math.floor(Math.random() * 9);
    otp = otp + randValue;
  }
  return otp;
};

//Mail Transporter for sending emails via Nodemailer email client
exports.mailTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_AUTH_EMAIL,
      pass: process.env.GOOGLE_AUTH_PASS,
    },
  });

/*
 EMAILING TEMPLATE
 This is the html email template that i used for sending all the email messages to user in this MERN project
*/
exports.HTMLEmailTemplate = (heading, mailBody) => {
  return `
  <!doctype html>
  <html lang="en">
  
  <head>
      <!-- Required meta tags -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>YourWebsiteTitle</title>
  
      <meta name="description" content="YourWebsiteDescription...">
  
      <meta name="keywords" content="YourWebsiteKeywords...">
  
      <!-- google-fonts -->
      <link href="//fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap"
          rel="stylesheet">
      <!-- //google-fonts -->
      <style>
          * {
              box-sizing: border-box;
              font-family: 'Nunito', sans-serif;
          }
  
          .mtp-bannner-top::before {
              content: "";
              background: rgb(0 0 0 / 80%);
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: -1;
          }
  
          /* Responsive */
          @media only screen and (max-width: 700px) {
  
              /* Tables
      parameters: width, alignment */
              .mtp-scale {
                  width: 100% !important;
              }
  
              .mtp-scale-90 {
                  width: 95% !important;
              }
  
              .mtp-scale-strip {
                  width: 95% !important;
                  padding: 20px !important;
                  padding-top: 0px !important;
              }
  
              .mtp-img-scale {
                  width: 100% !important;
              }
  
              table {
                  width: 100%;
              }
          }
  
          @media only screen and (max-width: 568px) {
              .counter-gd {
                  width: 100% !important;
                  display: block;
                  margin-bottom: 15px;
              }
  
              .sub-gd {
                  display: block;
                  width: 100% !important;
              }
          }
  
          @media only screen and (max-width: 415px) {
  
              span.heading {
                  font-size: 24px !important;
                  line-height: 34px !important;
              }
  
              td.gap-responsive-top {
                  height: 30px;
              }
          }
      </style>
  </head>
  
  <body style="margin: 0; padding: 0; background: #151313;">
      <!-- gap -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="mtp-scale" width="640px">
          <tbody>
              <tr>
                  <td class="gap-responsive-top" height="60">&nbsp;</td>
              </tr>
          </tbody>
      </table>
      <!-- /gap -->
  
      <!-- logo -->
      
      <!-- //logo -->
  
  
      <!-- text with paragraph -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="mtp-scale-90"
          style="background-color: #ffffff; padding: 50px 30px 50px;" width="640px">
          <tbody>
              <tr>
                  <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" class="mtp-scale" width="610px">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="right" border="0" cellpadding="0" cellspacing="0" class="mtp-scale"
                                          style=" font-size: 14px; color: #9b9b9b;" width="290px">
                                          <tbody>
                                              <tr>
                                                  <td class="mtp-scale-left-both">
                                                      <table align="right" border="0" cellpadding="0" cellspacing="0"
                                                          class="mtp-scale" width="610">
                                                          <tbody>
  
                                                              <tr>
                                                                  <td>
                                                                      <div style="text-align: left;">
                                                                          <span class="heading"
                                                                              style="display:block; max-width:500px; margin:auto; color: #333; font-weight: 300;font-size:28px; line-height: 40px;margin-bottom:20px;">
                                                                              <strong> ${heading} </strong>
                                                                          </span>
                                                                          <span
                                                                              style="font-size: 14px; line-height: 26px;">
                                     <span class="para" style="color:#666;">
                                       ${mailBody}                              
                                     </span>
                                                                              <br><br>
                                                                          </span>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                             
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
          </tbody>
      </table>
      <!-- //text with paragraph -->
  
  
  
      <!-- bg content -->
      
      <!-- //bg content -->
  
  
      <!-- footer -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="mtp-scale-90"
          style="background-color: #1976D2; padding: 30px 30px 40px 29px;" width="640px">
          <tr>
              <td>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="mtp-scale" style=""
                      width="610px">
                      <tr>
                          <td height="30"></td>
                      </tr>
                      <tr>
                          <td align="center">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" class="mtp-scale-90"
                                  width="560">
                                  <tr>
                                      <td align="center" style="font-size: 15px; color:#fff; line-height: 25px;">
                                         YourBusinessLocationAddress
                                         <br />
                                         <a href="tel:+12 123 4567"
                                              style=" font-size: 15px; color:#fff; text-decoration: none; line-height: 24px;">Phone: YourBusinessPhoneNumber</a>
                                          &nbsp; | &nbsp;
                                          <a href="YourWebsiteEmailAddress"
                                              style=" font-size: 15px; color:#fff; text-decoration: none; line-height: 24px;">Email: YourWebsiteEmailAddress</a>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td
                                          style="font-size: 15px; display: block; margin-top: 10px; color: #fff; line-height: 24px; text-align: center">
                                          &copy;  
                                          <script type = "text/javascript">
                                              let currentYear = new Date();
                                           document.write(currentYear.getFullYear()); 
                                        </script> YourWebsiteName, All rights reserved.
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td height="10"></td>
                      </tr>
                      <tr>
                          <td style="text-align: center;">
                              <span style="color:#666;">
                                  <a href="YourWebsiteAddress" style="font-size: 15px; color:#fff; text-decoration: underline;" target="_blank">Visit Website</a>
                                
                              </span>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <!-- //footer -->
  
      <!-- gap -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" class="mtp-scale" width="640px">
          <tbody>
              <tr>
                  <td class="gap-responsive-top" height="60">&nbsp;</td>
              </tr>
          </tbody>
      </table>
      <!-- /gap -->
  
  </body>
  
  </html> `
};

