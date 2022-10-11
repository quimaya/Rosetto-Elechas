const Habitacion = require("./habs.model")
const { setError } = require("../../helpers/error")
const { deleteFile } = require("../../middleware/cloudinary.delete")


const crear = async (req, res, next) => {
    try {
        const newHabitacion = new Habitacion(req.body);
        if (req.file) newHabitacion.imagen = req.file.path
        const HabExists = await Habitacion.findOne({ nombre: newHabitacion.nombre })
        if (HabExists) 
        return next(setError(409, "La habitación ya existe"))
        const habInDB = await newHabitacion.save();
        return res.json({
            status: 201,
            message: "Habitación creada",
            results: { habInDB }
        })


    } catch (error) {
        return next(
            setError(500, error.message | "No se ha podido crear la habitación")
        );
    }
}




const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const habitacion = await Habitacion.findById(id)
        if (!habitacion) return next(setError(404, 'Habitación no encontrada'))
        return res.json({
            status: 200,
            message: 'Habitación recuperada',
            data: { habitacion: habitacion }
        });
    } catch (error) {
        return next(setError(500, 'Error recuperando'))
    }
}

const recuperarTodo = async (req,res,next) => {
    try {
        const habitaciones = await Habitacion.find()
        return res.json({
            status: 201,
            message: "Habitaciones recuperadas",
            results: { habitaciones }})

    } catch (error) {
        return next(
            setError(500,  "Error recuperando"))
    }
}



const modificar = async (req, res, next) => {
    try {
        const { id } = req.params
        const habitacion = new Habitacion(req.body);
        habitacion._id = id;
        if (req.file) deleteFile(habitacion.imagen);
        if (req.file) elementDB.imagen = req.file.path

        const updatedHab = await Habitacion.findByIdAndUpdate(id, habitacion)
        if (!updatedHab) return next(setError(404, 'Code not found'))
        return res.json({
            status: 201,
            message: 'Habitación actualizada',
            data: { element: updatedHab }
        });
    } catch (error) {
        return next(setError(500, 'Fallo actualizando'));
    }
}


const borrar = async (req, res, next) => {
    try {
        const { id } = req.params
        const habBorrada = await Habitacion.findByIdAndDelete(id)

        if (habBorrada.imagen) deleteFile(habBorrada.imagen)
         /* if (postBorrado.cover) deleteFile(postBorrado.cover) */

        if (!habBorrada) return next(setError(404, 'Habitación no encontrada'))
        return res.json({
            status: 200,
            message: 'Habitación borrada',
            data: { element: habBorrada }
        });
    } catch (error) {
        return next(setError(500, 'Fallo borrando'));
    }
}

 

module.exports = {crear, getById, recuperarTodo, borrar, modificar}