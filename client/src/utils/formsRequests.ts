import { StaffLogin } from "@/components/staff/interfaces/staff.interface";
import { UserTypesBackend } from "@/components/user/interfaces/users.interface";

export const createNewClient = async (newClient: UserTypesBackend) => {
  const response = await fetch("https://easybank.fly.dev/staff/customer/register", {
      method: "POST",
      body: JSON.stringify(newClient),
      headers: {
        "Content-Type": "application/json",
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
      // Guardar token de autenticacion en localStorage
      sessionStorage.setItem('jwtSession', data.jwtSession);
      sessionStorage.setItem('jwt', data.jwt);
      return { data, status: 200 };
    }
  
    if (response.status === 404) return { data: data.msg, status: 404 }
  };