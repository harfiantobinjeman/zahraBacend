import express  from "express";
import {
    getAntrianDM,
    createAntrianDM,
    updateAntrianDM,
    deletAantrianDM,
    getAntrianDMById,
    getAntrianDMS,
    getAntrianNull
} from "../controllers/AntrianDMController.js";

const router = express.Router();

router.get('/api/antrianDM',getAntrianDM);
router.get('/api/antrianDMS',getAntrianDMS);
router.get('/api/antrianNull',getAntrianNull);
router.get('/api/antrianDM/:id', getAntrianDMById);
router.post('/api/antrianDM', createAntrianDM);
router.patch('/api/antrianDM/:id', updateAntrianDM);
router.delete('/api/antrianDM/:id', deletAantrianDM);

export default router;