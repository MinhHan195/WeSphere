const { resolve } = require("path");
const ApiError = require("../api-error");
const cloudinary = require("../config/cloudinary.config");

class CloudinaryRepsitory {
    async uploadImageBuffer(file) {
        try {
            const byteArrayBuffer = file.buffer;
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "WeSphere", resource_type: "image" },
                    (error, uploadResult) => {
                        if (error) {
                            return reject(new ApiError(500, "Error uploading image to Cloudinary"));
                        }
                        return resolve({
                            publicId: uploadResult.public_id,
                            url: uploadResult.secure_url
                        });
                    }
                ).end(byteArrayBuffer);
            })
        } catch (error) {
            throw error;
        }
    }

    async uploadImagePath(file) {
        try {
            const path = file.path;
            const result = await cloudinary.uploader
                .upload(path, { resource_type: "image", folder: "WeSphere" })
                .then(result => {
                    return {
                        publicId: result.public_id,
                        url: result.secure_url
                    };
                });
            if (result.publicId) {
                return result;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteImage(publicId) {
        try {
            return cloudinary.uploader.destroy(publicId).then(result => {
                return result;
            });
        } catch (error) {
            throw new ApiError(500, "Error deleting image from Cloudinary");
        }
    }

    async updateImage(file, publicId) {
        try {
            const delResult = await this.deleteImage(publicId);
            if (delResult.result !== "ok") {
                throw new ApiError(500, "Error deleting old image from Cloudinary");
            }
            const uploadResult = await this.uploadImage(file);
            return uploadResult;
        } catch (error) {
            throw new ApiError(500, "Error updating image in Cloudinary");
        }
    }

    async uploadVideo(file) {
        try {
            const path = file.path;
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_large(
                    path,
                    { resource_type: "video", folder: "WeSphere", chunk_size: 52428800 },
                    (error, uploadResult) => {
                        if (error) {
                            return reject(new ApiError(500, "Error uploading video to Cloudinary"));
                        }
                        return resolve({
                            publicId: uploadResult.public_id,
                            url: uploadResult.secure_url
                        });
                    }
                );

            })

        } catch (error) {
            throw error;
        }
    }
}

module.exports = CloudinaryRepsitory;