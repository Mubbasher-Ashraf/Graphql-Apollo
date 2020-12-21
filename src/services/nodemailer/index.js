import nodemailer from 'nodemailer';
// import previewEmail from 'preview-email';


const register = async (msg) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        jsonTransport: true,
        auth: {
            user: 'alberta.zieme64@ethereal.email',
            pass: 'e9JT96ukUZrm1yWYaG'
        }
    });
    const message = {
        from: 'caroline.gerlach23@ethereal.email',
        to: 'caroline.gerlach23@ethereal.email',
        subject: msg,
        html: '<p>Welcome to our site and Explore our repo for learning!</p>',
        text: 'Register Success'
    };
    
    // previewEmail(message).then(console.log('Success')).catch(console.error);
    transporter.sendMail(message).then(console.log('email sent successfully')).catch(console.error);
};

export default register;