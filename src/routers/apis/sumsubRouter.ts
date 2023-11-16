import express from 'express'
import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import CONSTANT from './../../../constant/constant';
import crypto from 'crypto'

const sumsubRouter = express.Router()

sumsubRouter.post('/generate-token', async (req: Request, res: Response) => {
    const { levelName } = req.body;

    try {
        axios.interceptors.request.use()
        console.log(CONSTANT.secret_key)
        const timestamp = Math.floor(Date.now() / 1000); // Current UNIX timestamp
        const hmac = crypto.createHmac('sha256', CONSTANT.secret_key);
        hmac.update(CONSTANT.Token + '&' + timestamp);

        const accessSignature = hmac.digest('hex');

        const userId = "random-JSToken-" + Math.random().toString(36)
        console.log("userID:", userId)
        const response = await axios.post(
            `https://api.sumsub.com/resources/accessTokens`,
            { userId: userId, levelName: levelName },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-App-Token': CONSTANT.Token,
                    'X-App-Access-Sig': accessSignature,
                    'X-App-Access-Ts': timestamp,

                },
            }
        );

        const { token } = response.data;
        res.json({ token });
    } catch (error) {
        const err = error as AxiosError
        console.error(error)
        console.error(err.message);
        res.status(500).json({ error: 'Failed to generate token' });
    }
});

export default sumsubRouter