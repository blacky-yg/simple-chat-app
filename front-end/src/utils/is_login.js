export const logout = () => {
    localStorage.removeItem("user_id");
}

export const isLogin = () => {
    if (localStorage.getItem("user_id")) {
        return true;
    }
    return false;
}