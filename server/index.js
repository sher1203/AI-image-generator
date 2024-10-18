import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(cors());


app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({limit: '50mb'}))

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async(req, res) => {
    res.send('Hello from DALL-E');
})

const startServer = async () => {

    try{
        connectDB(process.env.MONGODB_URL);
    }catch(error){
        console.log(error)
    }

    app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
}
startServer();
