import axios from "axios";

const webSettings = async () => {
  try {
    const { data } = await axios(`${process.env.NEXT_PUBLIC_URL}/webSettings`);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default webSettings;
