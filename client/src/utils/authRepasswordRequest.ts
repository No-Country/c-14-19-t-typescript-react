import { AuthCustomerRePass } from "@/components/user/interfaces/usersRePassword.interface";

export const authCustomerRePass = async (client: AuthCustomerRePass) => {
    try {
      const response = await fetch(`https://easybank.fly.dev/homebanking/recover/password`, {
        method: "POST",
        body: JSON.stringify(client),
        headers: {
          'Content-Type': `application/json`,
        }
      });

      const data = await response.json();
    
      if(response.status === 400){
        return data
      }
  
      if (response.status === 200) {
        return data;
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }