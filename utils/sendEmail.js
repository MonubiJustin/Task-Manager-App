const { Resend } = require("resend");

const sendEmail = async (resetLink, email) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const data = await resend.emails.send({
    //     from: "onboarding@resend.dev",
    from: "support@monubi.me",
    to: email,
    subject: "Reset your password",
    html: `<p>Click the link below to reset your password:</p>
                   <a href="${resetLink}">Click here to reset your password</a>`,
  });

  const { error } = data;
  if (error){
    console.log(error.message)
    process.exit(1)
  }

  console.log("email sent successfully:", data);
};

module.exports = sendEmail;
