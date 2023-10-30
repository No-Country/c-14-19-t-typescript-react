import { UpdateCustumer, UserTypesBackend } from "@/components/user/interfaces/users.interface";
import { getSession } from "./getJwtSession";



export const clietnSearch = async (dni: number) => {
  try {
    const token = await getSession(sessionStorage.getItem('jwtSession'))
    const response = await fetch(`https://easybank.fly.dev/staff/customer/${dni}`, {
      headers: {
        'Authorization': `Bearer ${token.jwt}`
      }
    });
    const data = await response.json();

    if (response.ok) return data; 
    else return { error: data.msg, status: 404 }
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const clientDelete = async (id: string | undefined) => {
  try {
    const token = await getSession(sessionStorage.getItem('jwtSession'))
    const response = await fetch(`https://easybank.fly.dev/staff/customer/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token.jwt}`
      }
    });

    if (response.ok) {
      const data = 'Cliente Eliminado'
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.msg);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export const clietnUpdate = async (id: string, client: UpdateCustumer) => {
  try {
    const token = await getSession(sessionStorage.getItem('jwtSession'))
    const response = await fetch(`https://easybank.fly.dev/staff/customer/${id}`, {
      method: "PATCH",
      body: JSON.stringify(client),
      headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${token.jwt}`
      }
    });
  
    if(response.status === 400){
      return response
    }

    if (response.status === 200) {
      return response;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.msg);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}