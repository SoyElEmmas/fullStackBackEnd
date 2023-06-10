const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log('entra a auth');

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //obtener el token del encabezado
      token = req.headers.authorization.split(" ")[1];

      //console.log('token: '+token);

      //Verificamos el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //obtenemos el user del token
      req.user = await User.findById(decoded.id).select("-password");

      console.log('recupera user',req.user);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Acceso no autorizado');
    }
  }

  if (!token) {
    console.log('error, no existe el token');
    res.status(401);
    throw new Error("Unauthorized. Token not provided");
  }
});

module.exports = {
    protect
  };