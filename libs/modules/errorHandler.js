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
    error[2004] = {message: "Admin access required.", code: 403};

    // room > 2100
    error[2101] = {message: "duplicated room name", code: 409}
    error[2102] = {message: "Room not found", code: 404}

    // movie > 2200
    error[2201] = {message: "duplicated movie name", code: 409}
    error[2202] = {message: "Movie not found", code: 404}

    // screening > 2300
    error[2301] = {message: "Screening not found", code: 404}
    error[2302] = {message: "Room already booked for this time slot", code: 409}
    error[2303] = {message: "Scheduled Time is passed", code: 400}

    // booking > 2400
    error[2401] = {message: "Booking not found", code: 404}
    error[2402] = {message: "Invalid seat number", code: 400}
    error[2403] = {message: "Seat already booked", code: 409}
    error[2404] = {message: "Not authorized to cancel this booking", code: 403}
    error[2405] = {message: "Cannot book seat for past screening", code: 400};


    let response = error[code] || {};
    let err = new Error();
    err["responseCode"] = response.code || 500;
    err["message"] = response.message || "";
    err["messageCode"] = code || "";

    return err;
};
