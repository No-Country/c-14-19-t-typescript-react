//* LISTAR STAFF MEMBERS
export const getStaffMembers = async (token: string) => {
    try {
        const response = await fetch('https://easybank.fly.dev/staff', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json();

        if (response.status === 401) return { error: data.msg, status: response.status };
        if (response.status === 200) return { staffs: data, status: response.status };
    } catch (error) {
        console.error(error);
    }
};