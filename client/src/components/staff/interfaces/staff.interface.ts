export interface StaffLogin {
    username: string;
    password: string;
};

export interface StaffLoginErrors {
    username?: string;
    password?: string;
};

export interface StaffRegister {
    name: string
    lastname: string
    birthday: string
    dni: string
    mail: string
    cellphone: string
    username: string
    password: string
    department: string
};

export interface StaffRegisterErrors {
    name?: string
    lastname?: string
    birthday?: string
    dni?: string
    mail?: string
    cellphone?: string
    username?: string
    password?: string
    department?: string
};

export interface BackendTypesStaff {
    name: string
    lastname: string
    birthday: string
    dni: number
    mail: string
    cellphone: number
    username: string
    password: string
    department: string
}

export interface account {
    number_account: string;
    money: string;
    id_user: string
}

export interface Cuenta {
    n: number;
    p: string;
}

export interface idAcount {
    id_user: string
}