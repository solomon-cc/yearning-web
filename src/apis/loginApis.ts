import { request } from "@/libs/requests";


const LoginCommonPath = {
    basic: '/front/login',
    gitlab: '/gitlab',
    callback: '/gitlab/callback'
}


interface LoginForm {
    username: string;
    password: string;
}

interface Gitlab {
    code: string;
    state: string;
}


export function LoginApi(args: LoginForm) {
    return request({
        url: LoginCommonPath.basic,
        method: "post",
        data: args
    })
}

export function GitlabLoginApi() {
    return request({
        url: LoginCommonPath.gitlab,
        method: "post",
    })
}

export function gitlabCallback(args: Gitlab) {
    return request({
        url: LoginCommonPath.callback,
        method: "get",
        params: args
    })
}
