import axios from "axios";

const BASE_LOCAL_URL = import.meta.env.VITE_BASE_API_URL_LOCAL;
const BASE_PROD_URL = import.meta.env.VITE_BASE_API_URL_PROD;

const API_BASE_URL = import.meta.env.PROD ? BASE_PROD_URL : BASE_LOCAL_URL;

export const getNotes = async (getToken, mongoUserId) => {
  const token = await getToken();

  //   GET NOTES
  return await axios
    .get(
      `${API_BASE_URL}/note`,

      {
        headers: {
          Authorization: token,
          userId: mongoUserId,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

// CREATE NOTE
export const createNote = async (getToken, mongoUserId, note) => {
  const token = await getToken();

  return await axios
    .post(
      `${API_BASE_URL}/note`,
      {
        userId: mongoUserId,
        note: note,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

// UPDATE NOTE
export const updateNote = async (getToken, note) => {
  const token = await getToken();

  return await axios
    .patch(
      `${API_BASE_URL}/note`,
      {
        note: note,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

// DELETE NOTES
export const deleteNotes = async (getToken, selectedIds) => {
  const token = await getToken();

  return await axios
    .delete(`${API_BASE_URL}/note`, {
      data: selectedIds,
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};
