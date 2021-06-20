const express = require("express");
const router = express.Router();
const  mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require('../../models/User')
const Category = require('../../models/Category');
const validateCategoryInput = require('../../validation/category');

router.post('/create', 
    passport.authenticate("jwt", { session: false }), 
    (req, res) => {

        const { errors, isValid } = validateCategoryInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Category.find({name: req.body.name}).find({user: req.user.id})
            .then(category => {
                if (category.length !== 0) {
                    errors.name = "You already have this category!"
                    return res.status(400).json(errors)
                } else {
                    const newCategory = new Category({
                        user: req.user.id,
                        name: req.body.name,
                        icon: req.body.icon,
                    })

                    newCategory
                        .save()
                        .then(category => res.json(category))
                }
            })
            .catch(err => res.status(400).json(err))
})

router.get('/',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Category.find({user: req.user.id})
            .then(categories => {                
                let payload = [];
                categories.map(category => {
                    const temp = {
                        id: category.id,
                        name: category.name,
                        icon: category.icon
                    }
                    payload.push(temp)
                    if (payload.length === categories.length) return res.json(payload)
                })
            })
    }
)

router.delete('/delete',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.body.name) {
            const filter = ({user: req.user.id}, {name: req.body.name})
            Category.findOneAndDelete(filter)
                .then(() => res.json("Delete Successfully!"))
        }
        if (req.body.id) {
            Category.findByIdAndDelete(req.body.id)
                .then(() => res.json("Delete Successfully!"))
        }      
    }
)

router.patch('/update',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.body.name) {
            if (1 < req.body.name.length && 21 > req.body.name.length) {
            } else {
                return res.json('Category name must be between 2 and 20 letters!')
            }
        } 

        Category.findById(req.body.id)
            .then(category => {
                let update = {}
                if (req.body.name) update.name = req.body.name;
                if (req.body.icon) update.icon = req.body.icon;
                Category.findByIdAndUpdate(category.id, update, { new: true })
                    .then(doc => {
                        const payload = {
                            name: doc.name,
                            icon: doc.icon
                        }
                        return res.json(payload)
                    })
            })
            .catch(err => {
                return res.status(400).json(err)
            })
    }
)

module.exports = router