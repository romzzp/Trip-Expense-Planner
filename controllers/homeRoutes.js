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
          attributes: ['category','budget','spent','id'],
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

router.get('/mytrips', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const tripData = await Trip.findAll({
      // where: {
      //   user_id: req.session.user_id,
      // },
      include: [
        {
          model: Destination,
          attributes: ['city','country'],
        },
        {
          model: Expenses,
          attributes: ['category','budget','spent','id'],
        },
      ],
    });

    // Serialize data so the template can read it
    const trips = tripData.map((trip) => trip.get({ plain: true }));
    console.log(trips);
    let totalBudget = 0;
    let totalSpent = 0;
    let completed = true;
    trips.forEach(trip => {
      console.log(trip);
      trip.expenses.forEach(expense => {
        totalBudget +=  expense.budget;
        if (expense.spent===null){
          console.log("Expense null");
          completed = false;
        } else {
          totalSpent+=expense.spent;
        }
      });
      trip.totalBudget = totalBudget;
      trip.totalSpent = totalSpent;
      trip.status = "P";
      if (completed){
        trip.status = "F";
      }
    });

    console.log(trips);
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
          model: Destination,
          attributes: ['city','country'],
        },
        {
          model: Expenses,
          attributes: ['category','budget','spent'],
        },
      ],
    });

    const trip = tripData.get({ plain: true });
    console.log(trip);
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

router.get('/destination/:citycountry', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    let citycountry = req.params.citycountry;
    let city = citycountry.split('@')[0];
    let country = citycountry.split('@')[1];
    console.log(city);
    console.log(country);

    const tripData = await Destination.findAll({
      where: {
        city: city, country: country
      },
    });

    // Serialize data so the template can read it
    const trips = tripData.map((trip) => trip.get({ plain: true }));
    console.log(trips);
    res.json(trips);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/destinations', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const destData = await Trip.findAll({});

    // Serialize data so the template can read it
    const destinations = destData.map((destination) => destination.get({ plain: true }));

    //res.json(trips);
    //Pass serialized data and session flag into template
    res.render('destinations', { 
      destinations, 
      logged_in: req.session.logged_in 
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
