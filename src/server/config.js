const devBaseURl = "https://nspwechat-uat-2.nike.com";
const proBaseURL = "http://localhost:80";

export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURl : proBaseURL;
export const TIME_OUT = 5000;