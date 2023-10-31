import axios from "axios";

// token validator
export default async function tokenCheck(tokenName) {
  if (tokenName) {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checkToken`,
      {
        headers: {
          Authorization: `Bearer ${tokenName}`,
        },
      }
    );

    if (data?.status) {
      return data.status;
    }

    return false;
  }

  return false;
}
