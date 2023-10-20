import { BackendTypesStaff, StaffLogin, StaffRegister } from "@/components/staff/interfaces/staff.interface";
import { CustomerRegister, UserTypesBackend } from "@/components/user/interfaces/users.interface";
import { removeSessionStorage } from "./removeSessionStorage";
import { getDepartmentLetter } from "./utils";
import { LoginFields } from "@/components/user/interfaces/usersLogin.interface";

export const createNewCustomer = async (newClient: UserTypesBackend, token: string) => {
  try {
    const response = await fetch("https://easybank.fly.dev/staff/customer/register", {
        method: "POST",
        body: JSON.stringify(newClient),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const loginStaff = async (staffUser: StaffLogin) => {
  try {
    const response = await fetch("https://easybank.fly.dev/staff/auth/login", {
      method: "POST",
      body: JSON.stringify(staffUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      // Guardar token de autenticacion, departamento y nombre en localStorage
      sessionStorage.setItem("jwtSession", data.jwtSession);
      sessionStorage.setItem("zxcvbn", getDepartmentLetter(data.staff.department));
      sessionStorage.setItem("username", data.staff.username);
      sessionStorage.setItem("authorized", "true");

      // Remover token despues de 3 hs
      removeSessionStorage();
      return { data, status: 200 };
    }

    if (response.status === 404) return { data: data.msg, status: 404 };
    if (response.status === 400) return { data: data.msg, status: 400 };
  } catch (error) {
    console.error(error);
  }
};

export const registerStaff = async (newStaff: BackendTypesStaff, token: string) => {  
  try {
    const response = await fetch("https://easybank.fly.dev/staff/auth/register", {
        method: "POST",
        body: JSON.stringify(newStaff),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    if (response.status === 404) return { data, status: 404 };
    if (response.status === 400) return { data, status: 400 };
    if (response.status === 201) return { data, status: 201 };
  } catch (error) {
    console.error(error);
  }
}

export const registerNewCustomer = async (customerAccount: CustomerRegister) => {
  try {
    const response = await fetch("https://easybank.fly.dev/homebanking/auth/register", {
        method: "POST",
        body: JSON.stringify(customerAccount),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) {
      const error = await response.json();
      return { error: error.msg, status: 400 };
    }

    if (response.status === 400) {
      const error = await response.json();
      return { error: error.msg, status: 400 };
    }

    if (response.status === 201) {
      const data = await response.json();
      return { data, status: 201 };
    }
  } catch (error) {
    console.error(error);
  }
};

export const loginCustomer = async (customerAccount: LoginFields) => {
  try {
    const response = await fetch("https://easybank.fly.dev/homebanking/auth/login", {
        method: "POST",
        body: JSON.stringify(customerAccount),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) {
      const error = await response.json();
      return { error: error.msg, status: 404 };
    }

    if (response.status === 400) {
      const error = await response.json();
      return { error: error.msg, status: 400 };
    }

    if (response.ok) {
      const data = await response.json();
      
      // Guardar sesion en storage
      sessionStorage.setItem('customerJwtSession', data.jwtSession);
      sessionStorage.setItem('isCustomer', 'c');
      sessionStorage.setItem('customerUser', data.homebanking.username);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}