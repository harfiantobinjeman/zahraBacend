import express  from "express";
import {    getLoket,
            getLoketById,
            createLoket,
            updateLoket,
            deleteLoket
} from "../controllers/LoketController.js";

const router = express.Router();

router.get('/api/loket',getLoket );
router.get('/api/loket/:id', getLoketById);
router.post('/api/loket', createLoket);
router.patch('/api/loket/:id', updateLoket);
router.delete('/api/loket/:id', deleteLoket);

export default router;