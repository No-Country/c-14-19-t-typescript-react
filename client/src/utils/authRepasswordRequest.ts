import { AuthCustomerRePass } from "@/components/user/interfaces/usersRePassword.interface";

export const authCustomerRePass = async (client: AuthCustomerRePass) => {
  try {
    const response = await fetch(
      `https://easybank.fly.dev/homebanking/recover/password`,
      {
        method: "POST",
        body: JSON.stringify(client),
        headers: {
          "Content-Type": `application/json`,
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

export const authUpdatePassword = async ( id: string, password: String, token: String | null) => {
  try {
    const response = await fetch(
      `https://easybank.fly.dev/homebanking/password/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 401) return { error: data.msg, status: 401 };
    if (response.status === 400) return { error: data.msg, status: 400 };
    if (response.ok) return { data, status: 200 };
  } catch (error) {
    console.error({ error });
  }
};
