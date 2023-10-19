export const getParsedDate = (date: string): string => {
    if(date === ''){
        return date
    }
    const [day, month, year] = date.split('/')[0].split('-').reverse()
    const finalDate = `${day}/${month}/${year.slice(-2)}`
    return finalDate;
};

export const getDepartmentLetter = (department: string): string => department.slice(0, department.length - (department.length - 1));