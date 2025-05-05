const User = require("../models/usuarioModel");
 
const getUserById = async(req, res, next) => {
    try{
        const id = req.params.id;
 
        const user = await User.findById(id);
        if (!User) {
            return res.status(404).json({msg: "usuario não encontrado "});
        }
        res.status(200).json({User};)
    } catch (error){
        next(error);
    }
};
 
module.exports = {
    getUserById
};
 
const express = require("express")
const router = express.Router();
const { getUserById} = require("../controllers/userController");
const checkToken = require("../middlewares/authMiddleware")
 
router.get("/:id",checkToken, getUserById);
module.exports = router;