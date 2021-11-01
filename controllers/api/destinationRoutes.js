const router = require('express').Router();
const { Destination } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => { //withAuth,
  try {
    const newDestination = await Destination.create({
      city: req.body.city,
      country: req.body.country,
    });

    res.status(200).json(newDestination);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
    // update a blogpost by its `id` value
    try {
      const destinationData = await Destination.update({
        city: req.body.city,
        country: req.body.country},
        {where: {id : req.params.id}});
      res.status(200).json(destinationData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id',  withAuth, async (req, res) => {
  try {
    const destinationData = await Destination.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!destinationData) {
      res.status(404).json({ message: 'No destination found with this id!' });
      return;
    }

    res.status(200).json(destinationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
