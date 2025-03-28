export const errorCode = (code) => {
    let error = {};

    // default
    error[400] = {message: "Bad Request.", code: 400};
    error[401] = {message: "Unauthorized! Please login", code: 401};
    error[403] = {message: "Access Denied!", code: 403};
    error[404] = {message: "Not Found", code: 404};
    error[410] = {message: "Expired!", code: 410};

    // user > 2000
    error[2001] = {message: "This username is registered already!", code: 409};
    error[2002] = {message: "User not registered yet!", code: 404};
    error[2003] = {message: "Wrong username or password.", code: 403};

    // room > 2100
    error[2101] = {message: "duplicated room name", code: 409}


    let response = error[code] || {};
    let err = new Error();
    err["responseCode"] = response.code || 500;
    err["message"] = response.message || "";
    err["messageCode"] = code || "";

    return err;
};
