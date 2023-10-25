export interface UserRegisterTypes {
    name: string;
    lastname: string;
    mail: string;
    birthday: string;
    dni: string
    cellphone: string;
};

export type ValidationErrors = Record<string, string>
export interface UserTypesBackend {
    name: string;
    lastname: string;
    mail: string;
    birthday: string;
    dni: number
    cellphone: number;
}


export interface UserData {
    id: string;
    name: string;
    lastname: string;
    dni: number;
    birthday: string;
    cellphone: string;
    mail: string;
    reference_code: string;
    role: string;
}

export interface UpdateCustumer {
    mail?: string;
    cellphone?: number;
}

export interface CustomerRegister {
    username: string;
    password: string;
    reference_code: string;
};

export type CustomerRegisterErrors = Record<string, string>