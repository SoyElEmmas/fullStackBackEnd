const asyncHandler = require("express-async-handler");
const Tarea = require("../models/tareaModel");

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find()
    res.status(200).json(tareas);
});

const setTareas = asyncHandler(async (req, res) => {
  if (!req.body.texto) {
    //res.status(400).json({message:'Por favor teclea un texto'})
    res.status(400);
    throw new Error("Falta colocar el texto");
  }

  const tarea = await Tarea.create({
    texto: req.body.texto,
  });

  res.status(201).json({ message: "Tarea creada", tarea: tarea });
});

const updateTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
       res.status(400)
       throw new Error ('La tarea ',req.params.id,' no fue encontrada')
    }

    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id,req.body, {new:true})

    res.status(200).json({ message: "Tarea actualizada", tareaUpdated });
});

const deleteTareas = asyncHandler(async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
       res.status(400)
       throw new Error ('La tarea ',req.params.id,' no fue encontrada')
    }
    await Tarea.deleteOne(req.params.id)
    res.status(200).json({ id:req.params.id });
});

module.exports = {
  getTareas,
  setTareas,
  updateTareas,
  deleteTareas,
};
