import express from 'express';
import { bookSlot, getAndAddSlot } from './controllers/slots.controller.js';
import cors from 'cors';
const app = express();

app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});



app.get('/api/v1/slots', getAndAddSlot);
app.post('/api/v1/slots', bookSlot);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});