import UserController from "../controller/user.js"
import PostController from "../controller/posts.js"
import CarController from "../controller/cars.js"
import MevaController from "../controller/mava.js"
import davlatController from "../controller/davlatlar.js"
import { Router } from "express"

const router = Router()


router.get("/api/all/users", UserController.GetAllUsers)
router.get("/api/user/:id", UserController.GetOneUser)
router.post("/api/user", UserController.Post)
router.put("/api/user", UserController.Put)
router.delete("/api/user/:id", UserController.DELETE)

router.get("/api/all/posts", PostController.GetAllPosts)
router.get("/api/post/:id", PostController.GetOnePost)
router.post("/api/post", PostController.Post)
router.put("/api/post", PostController.Put)
router.delete("/api/post/:id", PostController.DELETE)


router.get("/api/all/cars", CarController.GetAllCars)
router.get("/api/car/:id", CarController.GetOneCar)
router.post("/api/car", CarController.Post)
router.put("/api/car", CarController.Put)
router.delete("/api/car/:id", CarController.DELETE)


router.get("/api/all/meva", MevaController.GetAllMevalar)
router.get("/api/meva/:id", MevaController.GetOneMeva)
router.post("/api/meva", MevaController.Post)
router.put("/api/meva", MevaController.Put)
router.delete("/api/meva/:id", MevaController.DELETE)


router.get("/api/all/davlat", davlatController.GetAllDavlatlar)
router.get("/api/davlat/:id", davlatController.GetOneDavlat)
router.post("/api/davlat", davlatController.Post)
router.put("/api/davlat", davlatController.Put)
router.delete("/api/davlat/:id", davlatController.DELETE)



export default router