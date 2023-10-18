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