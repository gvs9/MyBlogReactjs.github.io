import { getToken } from "../util/util";

export const login = async (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password }),
  };
  try {
    const response = await fetch(
      "https://api-staging-v2.sploot.space/api/v2/auth/signin",
      requestOptions
    );
    return response.json();;
  } catch (error) {
    console.error(error);
  }
};


export const getUser = async () => {
  const token = getToken();
  try {
    const response = await fetch(
      "https://api-staging-v2.sploot.space/api/v2/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
