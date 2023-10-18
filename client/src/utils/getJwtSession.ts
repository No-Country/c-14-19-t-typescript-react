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
