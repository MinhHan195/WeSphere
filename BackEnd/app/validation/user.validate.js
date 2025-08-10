const Joi = require('joi');

exports.signInValidate = Joi.object({
    username: Joi.string().required().regex(/^\S+$/).messages({
        "string.pattern.base": "Tên người dùng không được chứa khoảng trắng",
        "string.empty": "Tên người dùng không được để trống",
        "any.required": "Tên người dùng là bắt buộc"
    }),
    password: Joi.string().min(6).max(30).required().messages({
        "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
        "string.max": "Mật khẩu không được vượt quá 30 ký tự",
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Mật khẩu là bắt buộc"
    }),
})