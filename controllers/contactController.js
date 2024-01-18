const nodemailer = require('nodemailer');

const contactController = async (req,res) => {
    const { firstName, lastName, subject, message, stdCode, phone, email } = req.body;
    console.log(req.body,">>>>>>>>>")


 
    const emailTemplate = `
    <html>
    <head>
        <style>
            .title {
                color: #fff;
                font-weight: 900;
                font-family: cursive;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #2984bd;
                padding: 20px;
                text-align: center;
            }
            .button {
                background-color: #4CAF50; /* Green */
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
            }
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }
            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
                color: #fff;
            }
            td {
                vertical-align: top;
            }
            tr th:first-child {
                width: 80px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="title">My Cloud Cam</h1>
            <h2 class="title">Contact Form Submission</h2>
            <table>
                <tr>
                    <th>Full Name</th>
                    <th>${firstName+ " " + lastName}</th>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td><a style="color: #fff;" href='tel:${stdCode}${phone}'>${stdCode+phone}</a></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><a style="color: #fff;" href='mailto:${email}'>${email}</a></td>
                </tr>
                <tr>
                    <td>Subject</td>
                    <td>${subject}</td>
                </tr>
                <tr>
                    <td>Message</td>
                    <td>${message}</td>
                </tr>
            </table>
        </div>
    </body>
</html>
    `;
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.GOOGLE_HOST,
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.GOOGLE_MAIL,
                pass: process.env.GOOGLE_PASS
            }
        });
        console.log("google mail receiver inside>>", process.env.GOOGLE_MAIL);
        console.log("email sender inside>>", email);
        console.log("google pass inside>>", process.env.GOOGLE_PASS);
        const mailOptions = {
            from: email,
            to: process.env.GOOGLE_MAIL,
            subject: `myCloudCam | Contact | ${subject}`,
            html: emailTemplate
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return false;
            } else {
              console.log("Email sent: " + info.response);
              return true;
            }
          });
          res.status(200).json("message sent successfull on email");

    } catch (error) {
        console.log(error);
    res.status(500).json(error);
    }
}

module.exports = contactController; 