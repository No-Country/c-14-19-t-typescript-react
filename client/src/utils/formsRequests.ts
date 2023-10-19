import { BackendTypesStaff, StaffLogin, StaffRegister } from "@/components/staff/interfaces/staff.interface";
import { UserTypesBackend } from "@/components/user/interfaces/users.interface";
import { removeSessionStorage } from "./removeSessionStorage";
import { getDepartmentLetter } from "./utils";

export const createNewCustomer = async (newClient: UserTypesBackend, token: string) => {
  const response = await fetch("https://easybank.fly.dev/staff/customer/register", {
      method: "POST",
      body: JSON.stringify(newClient),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
  );
  
  return response;
};

export const loginStaff = async (staffUser: StaffLogin) => {
    const response = await fetch('https://easybank.fly.dev/staff/auth/login', {
      method: 'POST',
      body: JSON.stringify(staffUser),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    
    if (response.status === 200) {
      // Guardar token de autenticacion, departamento y nombre en localStorage
      sessionStorage.setItem('jwtSession', data.jwtSession);
      sessionStorage.setItem('zxcvbn', getDepartmentLetter(data.staff.department));
      sessionStorage.setItem('username', data.staff.username);
      sessionStorage.setItem('authorized', 'true');
      
      // Remover token despues de 3 hs
      removeSessionStorage();
      return { data, status: 200 };
    }
  
    if (response.status === 404) return { data: data.msg, status: 404 }
  };

export const registerStaff = async (newStaff: BackendTypesStaff, token: string) => {  
  const response = await fetch('https://easybank.fly.dev/staff/auth/register', {
    method: 'POST',
    body: JSON.stringify(newStaff),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await response.json();  

  if (response.status === 404) return { data, status: 404 };
  if (response.status === 400) return { data, status: 400 };
  if (response.status === 201) return { data, status: 201 };
}