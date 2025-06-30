import User from './models/user.js';
import Notes from './models/notes.js';
import './config/db.js'
import express from 'express'
const app = express();
const PORT = 3000;

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