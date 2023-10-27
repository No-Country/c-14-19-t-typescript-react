import { idAcount } from "@/components/staff/interfaces/staff.interface";
import { getSession } from "./getJwtSession";


export const createAccount = async (id: idAcount) => {
    try {
        const token = await getSession(sessionStorage.getItem('jwtSession'))
        const response = await fetch(`https://easybank.fly.dev/staff/customer/account`,
            {
                method: "POST",
                body: JSON.stringify(id),
                headers: {
                    "Content-Type": `application/json`,
                    'Authorization': `Bearer ${token.jwt}`
                },
            }
        );

        const data = await response.json();

        if (response.status === 400) {
            return data;
        }

        if (response.status === 200) {
            sessionStorage.setItem("AuthUpdatePass", data.jwt);
            return data;
        } else {
            throw new Error(data.msg);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


export const getAccountList = async (id: String) => {
    try {
        const token = await getSession(sessionStorage.getItem('jwtSession'))
        const response = await fetch(`https://easybank.fly.dev/staff/customer/account/${id}/list`, {
            headers: {
                'Authorization': `Bearer ${token.jwt}`
            }
        });

        if (response.ok) {
            const data = await response.json();

            return data;
        } else {
            return 'error'
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};