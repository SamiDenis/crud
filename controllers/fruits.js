////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Fruit = require('../models/fruit')

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
router.get("/seed", (req, res) => {
    // array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ];

    // Delete all fruits
    Fruit.deleteMany({}).then((data) => {
        // Seed Starter Fruits
        Fruit.create(startFruits).then((data) => {
            // send created fruits as response to confirm creation
            res.json(data);
        });
    });
});

//Index Route
router.get('/', async (req, res) => {
    const fruits = await Fruit.find()
    res.render('fruits/index.liquid', { fruits })
})
// create route
router.post("/", (req, res) => {
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // create the new fruit
    Fruit.create(req.body)
        .then((fruits) => {
            // redirect user to index page if successfully created item
            res.redirect("/fruits");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

router.get('/new', (req, res) => {
    res.render('fruits/new.liquid')
})

// show route
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;

    // find the particular fruit from the database
    Fruit.findById(id)
        .then((fruit) => {
            // render the template with the data from the database
            res.render("fruits/show.liquid", { fruit });
        })
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

//update route
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;
    // update the fruit
    Fruit.findByIdAndUpdate(id, req.body, { new: true })
        .then((fruit) => {
            // redirect to main page after updating
            res.redirect("/fruits");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});

// delete route
router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the fruit
    Fruit.findByIdAndRemove(id)
        .then((fruit) => {
            // redirect to main page after deleting
            res.redirect("/fruits");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});


// edit route
router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the fruit from the database
    Fruit.findById(id)
        .then((fruit) => {
            // render edit page and send fruit data
            res.render("fruits/edit.liquid", { fruit });
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});
//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;