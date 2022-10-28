const { User } = require("../../models");
const { RequestError } = require("../../middlewares");
const { sendEmail } = require("../../helpers");

const verify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(400, "missing required field email");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target ="_blank" href="http://localhost:3000/api/users/verify/:${user.verificationToken}"> Verify email </a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = verify;
