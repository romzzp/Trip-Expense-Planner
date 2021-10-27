const router = require('express').Router();
const { Trip, Destination, Expenses, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const tripData = await Trip.findAll({
      where: {
        status: 'F',
      },
      include: [
        {
          model: Destination,
          attributes: ['city','country'],
        },
        {
          model: Expenses,
          attributes: ['category','budget','spent'],
        },
      ],
    });

    // Serialize data so the template can read it
    const trips = tripData.map((trip) => trip.get({ plain: true }));

    //res.json(trips);
    //Pass serialized data and session flag into template
    res.render('homepage', { 
      trips, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/tripuser', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const tripData = await Trip.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Destination,
          attributes: ['city','country'],
        },
        {
          model: Expenses,
          attributes: ['category','budget','spent'],
        },
      ],
    });

    // Serialize data so the template can read it
    const trips = tripData.map((trip) => trip.get({ plain: true }));

    //res.json(trips);
    //Pass serialized data and session flag into template
    res.render('mytrips', { 
      trips, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/trip/:id', async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Expenses,
          attributes: ['category','budget','spent'],
        },
      ],
    });

    const trip = tripData.get({ plain: true });

    //res.json(trip);
    res.render('trip', {
      ...trip,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
