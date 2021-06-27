const path = require('path');
const router = require('express').Router();
let Rooms = require('../models/room-model');

//returns all study rooms in db
router.route('/').get((req, res) => {

  Rooms.find()
      .then(rooms => res.json(rooms))
      .catch(err => res.status(400).json('Error: ' + err));

});

//add a new study room to db
router.route('/add').post(async (req, res) => {

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

//find a particular study room and delete it
router.route('/delete').post((req, res) => {
  const RoomId = req.body.roomID;
  const result = Rooms.findOneAndRemove({ creatorid: RoomId}, (err, docs) => {

    if (err) {

      console.log(err);
      res.status(404).json({message: err.message});
    
    } else {
      res.status(200).json({ id: RoomId });
    }
  });

});

//find a particular study room for its details
router.route('/:id').get((req, res) => {
    
    Rooms.findById(req.params.id)
      .then(room => res.json(room))
      .catch(err => res.status(400).json('Error: ' + err));
});

//update a particular rooms details
router.route('/update/:id').post((req, res) => {
    
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