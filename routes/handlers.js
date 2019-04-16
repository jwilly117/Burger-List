const express = require("express");
const router = express.Router();

const orm = require('../config/orm');

router.get("/", function(req, res){
    orm.selectAllBy('is_favorite', false, function(error, burgers) {
        if (error) {
            return res.status(501).json({
                message: 'Not able to query the database'
            });
        }

        console.log('Burgers: ' , burgers);
        res.render("index", { burgers, style: 'index'});
    })
});

router.get('/all', (req, res) => {
    orm.selectAll(function(error, burgers) {
        if (error) {
            return res.status(501).json({
                message: 'Not able to query the database'
            });
        }

        console.log('Burgers: ' , burgers);
        res.render("allBurgers", { burgers, style: 'all'});
    })
    
})

router.get('/favorites', (req, res) => {
    orm.selectAllBy('is_favorite', true, function(error, burgers) {
        if (error) {
            return res.status(501).json({
                message: 'Not able to query the database by favorites'
            });
        }
        res.render("favorites", {burgers, style: 'favorite' });
    })
})





router.post('/add', (req,res) => {
    const burgerName = req.body.burger_name;
    orm.insertOne(burgerName, function( error, burger){
        if (error){
            return res.status(401).json({
                message: 'Not able to add the burger'
            })
        }

        return res.json({
            burger_name: burgerName,
            id: burger.insertId,
            is_favorite: 0
        })
    })
})


router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    orm.deleteOne(id, function(error, burger) {
        if (error) {
            return res.status(501).json({
                message: 'Not Able to delete buger'
            })
        }

        return res.json({
            id
        })
    })

})


router.put('/:id/:value', (req, res) => {
    const id = req.params.id;
    const condition = JSON.parse(req.params.value);

    orm.updateOne(condition, id, function( error, burger) {
        if(error) {
            return res.status(501).json({
                message: 'not able to add burger to favorites'
            })
        }
        return res.json({
            id: id
        })
    })
})

module.exports = router;