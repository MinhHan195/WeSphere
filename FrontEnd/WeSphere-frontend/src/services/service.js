import authService from "./auth.service";
import postService from "./post.serice";

export const $api = {
    auth: authService,
    post: postService,
}