const path = require('path');
const router = require('express').Router();
let Rooms = require('../models/room-model');

router.route('/').get((req, res) => {

  Rooms.find()
      .then(rooms => res.json(rooms))
      .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/search').get(async (req, res) => {
  //returns all study rooms in db

  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i')
    
    const rooms = await Rooms.find( {title} )

    res.json({data: rooms});
    
  } catch (error) {

    res.status(404).json({ message: error.message });

  }
});

router.route('/add').post(async (req, res) => {
    //add a new study room to db

    try {

      const username = req.body.username;
      const creatorid = req.body.creatorid;
      const roomname = req.body.roomname;
      const description = req.body.description;
      const studymethod = req.body.studymethod ?? '';
      const subject = req.body.subject ?? '';

      const result = await Rooms.create({ username, roomname, creatorid ,description, studymethod, subject });

      res.status(200).json({result});

    } catch (error) {

      res.status(404).json({message: error.message})

    }
    



  

});

router.route('/:id').get((req, res) => {
    //find a particular study room for its details
    Rooms.findById(req.params.id)
      .then(room => res.json(room))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    //find a particular study room and delete it
    Rooms.findByIdAndDelete(req.params.id)
      .then(() => res.json('Room deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    //update a particular rooms details
    Rooms.findById(req.params.id)
      .then(room => {
        room.username = req.body.username;
        room.description = req.body.description;
        room.studymethod = req.body.studymethod;
        room.subject = req.body.subject;
  
        room.save()
          .then(() => res.json('Room updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;