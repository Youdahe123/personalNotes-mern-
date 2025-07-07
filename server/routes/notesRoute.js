import Notes from '../models/notes.js';
import express from 'express'

const Notesrouter = express.Router()

Notesrouter.post('/postNote',async (req,res) =>{
    try{
    const body = { title: req.body.title, content: req.body.content }
    const Body = await Notes.create({
        user: req.user.id,
        title: body.title,
        content : body.content,
    })
    console.log("Added Note")
    res.status(201).json({message:"Note Created:", Body})
    }catch(err){console.log(err),res.status(500).json({message: "Error"})}


})
Notesrouter.get('/getNote',async (req,res) =>{
    try{
        const notes = await Notes.find({user: req.user.id})
        res.json({notes})
    }catch(err)
{console.log(err),res.status(500).json({message:"Error"})}})
Notesrouter.put('/changeNote/:id',async (req,res) =>{
    try{
        const updatedNote = await Notes.findOneAndUpdate(
            { _id : req.params.id, user: req.user.id},
            { title : req.body.title, content : req.body.content},
            {new:true}
        )
        if(!updatedNote){
            return res.status(404).json({message:"Error Not found"})
        }
        res.json({message:"Note Updated", note : updatedNote})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Error"})
    }
})
Notesrouter.delete('/delNote/:id',async (req,res)=>{
    try{
        const deletedNote = await Notes.findOneAndDelete({
            _id : req.params.id, user: req.user.id
        })
        if(!deletedNote){
            return res.status(404).json({message : "Err not found"})
        }
        res.json({message:"Note deleted succesfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Error"})
    }
})
export default Notesrouter