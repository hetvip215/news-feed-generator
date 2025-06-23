import express from "express"
import { registerUser, userLogin, logoutUser, refreshAccessToken,getCurrentUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { signupValidation,loginValidation } from "../middlewares/validation.middleware.js"

const router = express.Router()

// @route   POST /api/v1/users/register
router.post("/register", signupValidation,registerUser)

// @route   POST /api/v1/users/login
router.post("/login",loginValidation, userLogin)

// @route   POST /api/v1/users/refresh-token
router.post("/refresh-token", refreshAccessToken)

// @route   POST /api/v1/users/logout
router.post("/logout", verifyJWT, logoutUser)

router.get("/me", verifyJWT, getCurrentUser);


export default router
