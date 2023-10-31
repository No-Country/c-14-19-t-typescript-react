import { idAcount } from "@/components/staff/interfaces/staff.interface";
import { getCustomerSession, getSession } from "./getJwtSession";

//***************STAFF*******************/
export const createAccount = async (id: idAcount) => {
  try {
    const token = await getSession(sessionStorage.getItem("jwtSession"));
    const response = await fetch(
      `https://easybank.fly.dev/staff/customer/account`,
      {
        method: "POST",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token.jwt}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 400) {
      return data;
    }

    if (response.status === 201) {
      return data
    } else {
      throw new Error(data.msg);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getAccountList = async (id: String) => {
  try {
    const token = await getSession(sessionStorage.getItem("jwtSession"));
    const response = await fetch(
      `https://easybank.fly.dev/staff/customer/account/${id}/list`,
      {
        headers: {
          Authorization: `Bearer ${token.jwt}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      return "error";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteAccountRequest = async (id_account: String) => {
  try {
    const token = await getSession(sessionStorage.getItem("jwtSession"));
    const response = await fetch(
      `https://easybank.fly.dev/staff/customer/account/${id_account}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token.jwt}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      return "error";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//***************STAFF*******************/


//***************CLIENT*******************/
export const getAccountListClient = async (id: String) => {
  try {
    const token = await getCustomerSession(sessionStorage.getItem("customerJwtSession"));
    const response = await fetch(
      `https://easybank.fly.dev/homebanking/account/${id}/list`,
      {
        headers: {
          Authorization: `Bearer ${token.jwt}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return data.msg;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getTransferListClient = async (number_account: String) => {
  try {
    const token = await getCustomerSession(sessionStorage.getItem("customerJwtSession"));
    const response = await fetch(
      `https://easybank.fly.dev/homebanking/transference/${number_account}/list`,
      {
        headers: {
          Authorization: `Bearer ${token.jwt}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);
    
    if (response.ok) {
      return data;
    } else {
      return data.msg;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteAccountClient = async (id_account: String) => {
  try {
    const token = await getCustomerSession(sessionStorage.getItem("customerJwtSession"));
    const response = await fetch(
      `https://easybank.fly.dev/homebanking/account/${id_account}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token.jwt}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return data.msg;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createAccountClient = async (id: idAcount) => {
  try {
    const token = await getCustomerSession(sessionStorage.getItem("customerJwtSession"));
    const response = await fetch(
      `https://easybank.fly.dev/homebanking/account`,
      {
        method: "POST",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token.jwt}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 400) {
      return data;
    }

    if (response.status === 201) {
      return data
    } else {
      throw new Error(data.msg);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};