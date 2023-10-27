export interface LoginFields {
    username: string;
    password: string;
};

export type LoginErrors = Record<string, string>