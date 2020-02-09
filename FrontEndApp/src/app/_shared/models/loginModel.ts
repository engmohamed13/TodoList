export class LoginModel {
    userName: string;
    password: string;
    RememberMe: boolean;
    Grant_type: string;
    Refresh_token: string;
}

export class loginTokenModel {
    access_token: string;
    token_type: string;
    expires_in: string;
    refresh_token: string;
    client_id: string;
    userName: string;
    name: string;
    role: string[];
    firstName: string;
    lastName: string;
    email: string;
    issued: string;
    expires: string;
    remember_me: boolean;
}
export class UserInfoViewModel {

    username: string;
    isActiveDirectoryUser: string;
    userProfileUrl: string;
}