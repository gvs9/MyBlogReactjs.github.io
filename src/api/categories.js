import { getToken } from "../util/util";

export const getCategories = async () => {
  const token = getToken();
  try {
    const response = await fetch(
      "https://api-staging-v2.sploot.space/api/v2/cms/post-categories",
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

export const getBlogs = async (name) => {
    const token = getToken();
    try {
      const response = await fetch(
        "https://api-staging-v2.sploot.space/api/v2/public/cms/post-categories/" + name,
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


