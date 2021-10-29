const router = require('express').Router();
const { Trip } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/add-trip',  async (req, res) => { 
  try {
    const newTrip = await Trip.create({
      description: req.body.description,
      start_date: req.body.start_date,
      duration: req.body.duration,
      status: req.body.status,
      user_id: req.session.user_id,
      destination_id: req.body.destination_id,
    });

    res.status(200).json(newTrip);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id',  async (req, res) => {
    // update a blogpost by its `id` value
    try {
      const tripData = await Trip.update({
        description: req.body.description,
        start_date: req.body.tripDate,
        duration: req.body.duration,
        status: req.body.status,
        user_id: req.session.user_id,
        destination_id: req.body.destination_id,}, 
        {where: {id : req.params.id}});
      res.status(200).json(tripData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id',   async (req, res) => {
  try {
    const tripData = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with this id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
