const { mailTransport } = require("../utils/mail");

exports.sendAlert = (req, res) => {
    const {bloodPresure, heartRate} = req.body

    mailTransport().sendMail({
        from: 'crezytechy@gmail.com',
        to: 'zamanashadu4@gmail.com',
        subject: 'Alert Message',
        html: `<p>Heart rate: ${heartRate}</p>
        <p>Blood presure: ${bloodPresure}</p>
        <p>User maybe not well</p>
        `,
      });

    res.json({bloodPresure, heartRate})
} 