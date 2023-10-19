import express from "express";

import {
    createProperty,
    getProfile
} from "../controllers/propertyController.js";

const router = express.Router();

router.post('/',createProperty);
router.route('/:id').get(getProfile);


export default router;