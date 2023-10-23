export interface LoginFields {
    username: string;
    password: string;
};

export interface LoginErrors {
    username?: string;
    password?: string;
};

export interface LoginChangePassword {
    password: string;
    rePassword: string;
};

export interface LoginErrorsChangePassword {
    username?: string;
    password?: string;
};