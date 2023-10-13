// Calcula si es mayor de edad y valida que no se inserte un año menor a 1900
const calculateUserAge = (birthday: string): boolean => {
    const getUserYear = new Date(Date.parse(birthday)).getFullYear();
    const actualYear = new Date().getFullYear()
    return actualYear - getUserYear >= 18 && getUserYear >= 1900;
};

export default calculateUserAge