export const removeSessionStorage = () => {
    const time = 3 * 60 * 60 * 1000;

    setTimeout(() => {
        sessionStorage.removeItem('jwtSession');
        console.log('Item will remove after 3 hours');
    }, time);
};