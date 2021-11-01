const router = require('express').Router();
const { Expenses } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/',  withAuth, async (req, res) => {
  try {
    console.log("expense create");
    console.log(req.body.spent);
    let newExpense 
    if (req.body.spent){
      newExpense= await Expenses.create({
        trip_id: req.body.trip_id,
        category: req.body.category,
        budget: req.body.budget,
        spent: req.body.spent,
      });
    } else {
      newExpense= await Expenses.create({
        trip_id: req.body.trip_id,
        category: req.body.category,
        budget: req.body.budget
      });
    }


    res.status(200).json(newExpense);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  // update a blogpost by its `id` value
  try {
    const tripData = await Expenses.update({
      trip_id: req.body.trip_id,
      category: req.body.category,
      budget: req.body.budget,
      spent: req.body.spent},
      {where: {id : req.params.id}});
    res.status(200).json(tripData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const tripData = await Expenses.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!tripData) {
      res.status(404).json({ message: 'No expense found with this id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
