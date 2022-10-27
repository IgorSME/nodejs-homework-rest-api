const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarPath = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarPath, avatarName);

    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);

    await User.findByIdAndUpdate(id, { avatarURL });
    Jimp.read(resultUpload)
      .then((image) => {
        image.resize(250, 250).write(resultUpload);
      })
      .catch((err) => {
        throw err;
      });
    res.json({
      status: "success",
      code: 200,
      data: { avatarURL },
    });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
