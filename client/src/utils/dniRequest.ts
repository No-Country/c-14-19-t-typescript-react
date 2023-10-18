
export const clietnSearch = async (dni: number) => {
    try {
      const token = sessionStorage.getItem("jwt");
      const response = await fetch(`https://easybank.fly.dev/staff/customer/${dni}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.msg);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };