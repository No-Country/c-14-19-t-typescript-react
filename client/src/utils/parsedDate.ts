const getParsedDate = (date: string) => {
    const [day, month, year] = date.split('/')[0].split('-').reverse()
    const finalDate = `${day}/${month}/${year.slice(-2)}`
    return finalDate;
};

export default getParsedDate;