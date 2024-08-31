import asyncHandler from "./asynchandler.middleware.js";

const checkAuth = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    console.log(token);
    next();

});

export { checkAuth };
