const express = require('express');
const Note = require('../Models/Note');
const fetchuser = require('../Middleware/fetchuser');
const User = require('../Models/User');
const Joi = require('joi');

const app = express.Router();

//route-1
app.post('/newnote', fetchuser, async (req, res) => {

    try {
        const validation = validateNotes(req.body); 
        const { value, error } = validation;
        if (!error) {
            const note = new Note(); //making a new note
            const userId = await User.findById(req.userId); //jwt token is decoded/verified in req.userId
            note.userId = userId; //notes table/schema is joined with user table
            note.title = req.body.title;
            note.description = req.body.description;
            note.tags = req.body.tags;
            res.send({_id:note._id,
                title:note.title,
                description:note.description
            
            });
            await note.save(); //saving note in the database
 
        }
        else {
            res.status(502).send(error.message);
        }
    } catch (error) {
        console.error(error.message);
        
    }

    function validateNotes(notes) {
        const schema = Joi.object({ 
            title: Joi.string().max(100).required(),
            description: Joi.string().max(10000).required(),
            tags: Joi.string().min(5).max(1024),
            date: Joi.date(),
            editedOn: Joi.date(), 
        });
        return schema.validate(notes); //have to pass a req.body arg

    }
});



//route-2
app.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const userId = req.userId;
        const notes = await Note.find({ userId: userId }).select('-_id,-user');
        res.send(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

})



//route-3
app.patch('/updatenote/:id',fetchuser, async(req,res)=> {
    //patch is the update

    try {
    const {title, description, tags}  = req.body;
    const user = await User.findById(req.userId);
    if(!user) return res.status(404).send('User Not Found');
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).send('Note Not Found');

    const newNote = {    };
    
    if(title) newNote.title = title; 
    if(description) newNote.description = description;
    if(tags) newNote.tags = tags;
    //newNote.editedOn = Date.now();
    
        if(note.userId.equals(user._id)){
            const prevNote = await Note.findByIdAndUpdate(req.params.id, newNote, {
                new: true
              });
              res.status(200).send(req.body);
        }
        else{ 
            res.status(501).send('Please enter a valid note');
        }
    } catch (error) {
        res.status(500).send('Internal server Error');
        console.log(error);
        
    }



})


//route-4
app.delete('/deletenote/:id',fetchuser, async(req,res) =>{

    const user = await User.findById(req.userId);
    if(!user) return res.status(404).send('User Not Found');
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).send('Note Not Found');


    try {
        if(note.userId.equals(user._id)){ //if you don't want to make it to toString() or getting an error
            const delNote = await Note.findByIdAndDelete(req.params.id);
              res.status(200).send('Note Successfully Deleted!');
        }
        else{
            res.status(501).send('Please enter a valid note');
        }
    } catch (error) {
        res.status(500).send('Internal server Error');
        console.log(error);
        
    }

})
module.exports = app