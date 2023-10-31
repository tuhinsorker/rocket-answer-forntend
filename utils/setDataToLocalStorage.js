export default function setDataToLocalStorage(res, userType) {
  let userData;

  if (userType === "expert") {
    const { user_type, profile } = res.data.data;
    const { user_id, display_name, profile_photo_url } = profile.expert;

    userData = {
      user_type,
      user_name: display_name,
      id: user_id,
      profile_photo: profile_photo_url,
    };
  } else {
    const { user_type, profile } = res.data.data;
    const { user_id, name, image } = profile.customer;

    userData = {
      user_type,
      user_name: name,
      id: user_id,
      profile_photo: image,
    };
  }

  // console.log(userData);

  // set to local storage
  const jsonString = JSON.stringify(userData);
  localStorage.setItem("userInfo", jsonString);
}
