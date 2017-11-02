import cookie from "cookie";

export default function(req, res, next) {
  req.parsedCookies = cookie.parse(req.headers.cookie || "");
  next();
}
