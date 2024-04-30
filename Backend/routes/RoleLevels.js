const User = require("../modules/UserSchema");
const Roles = require("./Roles");
const jwt = require("jsonwebtoken");
const secretKey = "mytestsecretkey";

const LevelsRoutes = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Missing or invalid token" });
    }

    const token = authorizationHeader.split(" ")[1];
   

    const decodedToken = jwt.verify(token, secretKey);
    req.user = { userId: decodedToken.userId, email: decodedToken.email };

    const user = await User.findOne({
      _id: req.user ? req.user.userId : undefined,
    });

    if (!user) {
      return res.status(400).send("No User");
    }

    const userRole = user.userRole;

    if (userRole === Roles.SUPER_ADMIN) {
      next();
    } else if (userRole === Roles.DEPARTMENT_HEAD) {
      next();
    } else if (userRole === Roles.PROJECT_LEAD) {
      if (req.method === "GET" || req.method === "POST") {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "Access not allowed as userRole = 2" });
      }
    } else if (userRole === Roles.MEMBER) {
      if (req.method === "GET") {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "Access not allowed as userRole = 3" });
      }
    } else {
      return res
        .status(403)
        .json({
          message:
            "Access not allowed for other userRoles or unauthorized users",
        });
    }
    
  } catch (error) {
    console.log("Catch error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = LevelsRoutes;
