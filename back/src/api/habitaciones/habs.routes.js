const HabsRoutes = require('express').Router();

const {crear, getById, recuperarTodo, borrar, modificar} = require("./habs.controller")

const upload = require ("../../middleware/cloudinary.upload")


HabsRoutes.post('/crear', upload.single("cover"), crear );


HabsRoutes.get('/id/:id', getById )
HabsRoutes.get('/', recuperarTodo);

HabsRoutes.patch('/updateID/:id', upload.single("cover"), modificar );

HabsRoutes.delete('/borrar/:id', borrar );




module.exports = HabsRoutes;