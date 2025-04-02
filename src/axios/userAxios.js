import axios from "axios";
const BASE_LOCAL_URL = import.meta.env.VITE_BASE_API_URL_LOCAL;
const BASE_PROD_URL = import.meta.env.VITE_BASE_API_URL_PROD;

const API_BASE_URL = import.meta.env.PROD ? BASE_PROD_URL : BASE_LOCAL_URL;

export const saveUser = async (getToken, user, setMongoUserId) => {
  const token = await getToken();
  const response = await axios
    .post(
      `${API_BASE_URL}/user`,
      {
        userId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        name: user.fullName,
        role: "buyer",
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));

  const { data } = await response;

  setMongoUserId(data._id);
};
