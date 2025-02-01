import express  from "express";
import 
{   getAntrianM, 
    createAntrianM, 
    updateAntrianM, 
    deleteAntrianM, 
    getAntrianMById } 
from "../controllers/AntrianMController.js"

const router = express.Router();

router.get('/api/AntrianM',getAntrianM);
router.get('/api/AntrianM/:id', getAntrianMById);
router.post('/api/AntrianM', createAntrianM);
router.patch('/api/AntrianM/:id', updateAntrianM);
router.delete('/api/AntrianM/:id', deleteAntrianM);

export default router;