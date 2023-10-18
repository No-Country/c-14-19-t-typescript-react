
export const clietnSearch = async (dni: number) => {

    const token = sessionStorage.getItem("jwt")

    const response = await fetch(`https://easybank.fly.dev/staff/customer/${dni}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (response.ok) {
        return data
    } else {
        return console.log(data.msg);
        
    }
}