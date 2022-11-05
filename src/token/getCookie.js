import Cookies from "js-cookie";

const GetCookie = (cookiename) => {
    return Cookies.set(cookiename);
};

export default GetCookie;