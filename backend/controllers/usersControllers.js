const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    console.log("Datos de usuario no validos");
    res.status(404);
    throw new Error("Datos de usuario no validos");
  }
});

const createUser = asyncHandler(async (req, res) => {
  //se desestructura el body
  const { name, email, password } = req.body;

  console.log("desestructura");

  //se validan los parametros
  if (!name || !email || !password) {
    //res.status(400).json({message:'Por favor teclea un texto'})
    console.log("error en params");
    res.status(400);
    throw new Error("Datos incompletos");
  }

  console.log("busca por email: ", email);

  //se verifica si el usuario existe
  const userExists = await User.findOne({ email });

  //si existe regresa error
  if (userExists) {
    console.log("user Exists");
    res.status(400);
    throw new Error("Ese usuario ya existe");
  }

  console.log("no existe el usuario");

  //genera la sal
  const salt = await bcrypt.genSalt(10);

  console.log("genera la sal");
  //hashea el pass
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log("hashea el pass");
  //crea el objeto
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  console.log("objeto creado");

  if (user) {
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400);
    throw new Error("Error al crear el usuario");
  }
});

const misDatos = asyncHandler( async (req,res) =>{
  res.status(200).json({message:'mis datos'})
})

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '10m' });
};

const updateTareas = asyncHandler(async (req, res) => {
  const tarea = await Tarea.findById(req.params.id);

  if (!tarea) {
    res.status(400);
    throw new Error("La tarea ", req.params.id, " no fue encontrada");
  }

  const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ message: "Tarea actualizada", tareaUpdated });
});

const deleteTareas = asyncHandler(async (req, res) => {
  const tarea = await Tarea.findById(req.params.id);

  if (!tarea) {
    res.status(400);
    throw new Error("La tarea ", req.params.id, " no fue encontrada");
  }
  await Tarea.deleteOne(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  createUser,
  loginUser,
  misDatos
};
