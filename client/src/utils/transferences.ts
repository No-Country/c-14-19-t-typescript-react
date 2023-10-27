import { AccountsTransferData } from "@/components/transferences/interfaces/transferences.interface";

//* LISTAR CUENTAS BANCARIAS
export const getCustomerAccounts = async (id: string, token: string) => {
    try {
        const response = await fetch(`https://easybank.fly.dev/homebanking/account/${id}/list`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (response.status === 401) return { error: 'Unauthorized', status: 401 }
        if (response.ok) return data;
    } catch (error) {
        console.error(error);
    }
};

export const transferBetweenAccounts = async (body: AccountsTransferData, token: string) => {
    try {
        const response = await fetch('https://easybank.fly.dev/homebanking/transference', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json();

        if (response.status === 401) return { error: data.msg, status: 401 };
        if (response.status === 400) return { error: data.msg, status: 400 };
        if (response.status === 201) return { success: data, status: 201 };

    } catch (error) {
        console.error(error);
    }
};