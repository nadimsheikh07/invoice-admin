import { getToken } from "./user";
export const authHeader = () => {
  const token = getToken();
  let lang = "en";
  if (process.browser) {
    lang = localStorage.getItem("i18nextLng");
  }

  if (token) {
    return {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
      "X-localization": lang,
      // 'Content-Type': 'multipart/form-data'
    };
  } else {
    return {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
      "X-localization": lang,
      // 'Content-Type': 'multipart/form-data'
    };
  }
};
