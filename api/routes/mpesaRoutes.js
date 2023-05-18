import express from "express";
import { mpesa} from "../controllers/mpesaController.js";

const router = express.Router();

//route to get the auth token
router.get('/get-auth-token',mpesa.getOAuthToken);

//lipa na mpesa online 
router.post('/lipa-na-mpesaa',mpesa.getOAuthToken,mpesa.lipaNaMpesaOnline);

//lipa na pending
router.post('/lipa-pending',mpesa.getOAuthToken,mpesa.lipaNaMpesaPending);

//callback url
router.post('/lipa-na-mpesa-callback/:id',mpesa.lipaNaMpesaOnlineCallback);

export default router