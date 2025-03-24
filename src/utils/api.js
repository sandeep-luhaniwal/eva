export const registerUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error registering user:", error);
      return { error: "Something went wrong!" };
    }
  };
  