import express from 'express';
import CONSTANT from '../constant/constant';
import router from './routers/apis';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(CONSTANT.port, () => {
    console.log(`Server running at http://localhost:${CONSTANT.port}`);
});
