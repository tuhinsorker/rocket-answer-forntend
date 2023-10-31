const IMG_BASE_URL = process.env.NEXT_PUBLIC_IMG_BASE_URL;

export default function imgPath(img_name) {
  const path = IMG_BASE_URL.concat(img_name);

  return path;
}
