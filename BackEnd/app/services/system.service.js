const cloudinaryRepsitory = require("../repository/cloudinary.respository");
const SQL = require("../utils/sqlserver.util");
const systemRepository = require("../repository/system.repository");

exports.createReport = async (userId, file, data) => {
    const SystemRepository = new systemRepository(SQL.client);
    const CloudinaryRepsitory = new cloudinaryRepsitory();
    let mediaUrl = "";
    if (file) {
        const type = file.mimetype.split("/")[0];
        if (type === "image") {
            mediaUrl = await CloudinaryRepsitory.uploadImagePath(file);
        } else if (type === "video") {
            mediaUrl = await CloudinaryRepsitory.uploadVideo(file);
        }
    }
    console.log(mediaUrl);


    const result = await SystemRepository.createReport(userId, mediaUrl, data);
    return result;
}
