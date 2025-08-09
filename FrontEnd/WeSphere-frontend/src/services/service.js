import authService from "./auth.service";
import postService from "./post.serice";
import systemService from "./system.service";

export const $api = {
    auth: authService,
    post: postService,
    system: systemService
}