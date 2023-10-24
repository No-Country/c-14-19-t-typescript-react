//* OBTENER JWT STAFF
export const getSession = async (sessionToken: string | null) => {
  const response = await fetch("https://easybank.fly.dev/staff/auth/session", {
    method: "POST",
    body: JSON.stringify({ sessionToken }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

//* OBTENER JWT CLIENTE
export const getCustomerSession = async (sessionToken: string | null) => {
  try {
    const response = await fetch("https://easybank.fly.dev/homebanking/auth/session", {
      method: "POST",
      body: JSON.stringify({ sessionToken }),
      headers: {
        "Content-Type": "application/json"
      },
    })

    const data = await response.json();
    return data;
  } catch (error) {
    console.error({error});
  }
};