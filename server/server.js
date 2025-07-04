import path from 'path'
import { fileURLToPath } from 'url';
import User from './models/user.js';
import Notes from './models/notes.js';
import Notesrouter from './routes/notesRoute.js';
import './config/db.js'
import express from 'express'
const app = express();
const PORT = 3000;
import router from './routes/userRoute.js'
import protect from './middleware/authMiddleWare.js';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users',router)
app.use('/api/notes',protect,Notesrouter)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname,'../front_end')))


router.get('/protected',protect,(req,res)=>{
    res.json({message: "You are authorized"})
})


app.get('/', async (req, res) => {
    try{
        const users = await User.find();
        const notes = await Notes.find();
        res.json([users,notes])
    }catch(err){console.log(err)}
    
});

app.listen(
    PORT,
    () => console.log(`Server is running on PORT:${PORT}!`)
);