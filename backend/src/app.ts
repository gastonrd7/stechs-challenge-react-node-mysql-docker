import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/routes';
const app = express();

//settungs
app.set('port', process.env.PORT || 3001);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.get('/', (req, res) =>{
    res.send(`THE API is at http://localhost:${app.get('port')}`);
});

app.use('/Api', routes); 

export default app;