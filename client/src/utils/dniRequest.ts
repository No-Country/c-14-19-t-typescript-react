import { getSession } from "./getJwtSession";


export const clietnSearch = async (dni: number) => {
  try {
    const token = await getSession(sessionStorage.getItem('jwtSession'))
    const response = await fetch(`https://easybank.fly.dev/staff/customer/${dni}`, {
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
    throw error;
  }
};

export const clientDelete = async (id: string | undefined) => {
  try {
    const token = await getSession(sessionStorage.getItem('jwtSession'))
    const response = await fetch(`https://easybank.fly.dev/staff/customer/${id}`, {
      method: "DELETE",
      headers: {
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
    throw error;
  }
}