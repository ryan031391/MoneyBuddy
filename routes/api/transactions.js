const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const Category = require('../../models/Category');
const Transaction = require('../../models/Transaction');
const validateCategoryInput = require('../../validation/transaction');

router.get('/',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Transaction.find({ user: req.user.id })
            .then(transactions => {
                if (transactions.length !== 0) {
                    let payload = [];
                    transactions.map(transaction => {
                        Category.findById(transaction.category)
                            .then(doc => {
                                const temp = {
                                    id: transaction.id,
                                    category: doc.name,
                                    icon: doc.icon,
                                    description: transaction.description,
                                    amount: transaction.amount,
                                    type: transaction.type,
                                    date: transaction.date
                                }
                                payload.push(temp)
                                if (payload.length === transactions.length) return res.json(payload)                        
                            })
                    }) 
                } else {
                    return res.json(['This user has no transaction'])
                }
                       
            })
            .catch(err => res.json('No transaction'))

    }
)

router.post('/create',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        const { errors, isValid } = validateCategoryInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Category.find({user: req.user.id}).find({name: req.body.category})
            .then(category => {
                const newTransaction = new Transaction({
                    user: req.user.id,
                    category: category[0].id,
                    amount: req.body.amount,
                    type: req.body.type,
                    description: req.body.description,
                    date: req.body.date
                })

                newTransaction
                    .save()
                    .then(transaction => {
                        Category.findById(transaction.category)
                            .then(doc => {
                                const payload = {
                                    id: transaction.id,
                                    category: doc.name,
                                    icon: doc.icon,
                                    amount: transaction.amount,
                                    type: transaction.type,
                                    description: transaction.description,
                                    date: transaction.date
                                }
                                return res.json(payload)
                            })
                    })
            })
            .catch(err => res.json('Category not exist'))
    }
)

router.patch('/update',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        if (req.body.description) {
            if (req.body.description.length > 140) {
                return res.json('No more than 140 letters!')
            }
        }

        if (req.body.amount) {
            if (req.body.amount < 0) {
                return res.json('Amount must be positive')
            }
        }

        Transaction.findById(req.body.id)
            .then(transaction => {
                let update = {};
                if (req.body.category) {
                    Category.find({user: req.user.id}).find({name: req.body.category})
                        .then(category => {
                            update.category = category[0].id
                            if (req.body.amount) update.amount = req.body.amount;
                            if (req.body.type) update.type = req.body.type;
                            if (req.body.description) update.description = req.body.description;
                            if (req.body.date) update.date = req.body.date;
                            Transaction.findByIdAndUpdate(transaction.id, update, { new: true })
                                .then(doc => {
                                    Category.findById(doc.category)
                                        .then(category => {
                                            const payload = {
                                                category: category.name,
                                                amount: doc.amount,
                                                type: doc.type,
                                                description: doc.description,
                                                date: doc.date
                                            }
                                            return res.json(payload)
                                        })
                                })
                        })
                        .catch(err => res.json('Wrong Category'))
                } else {            
                    if (req.body.amount) update.amount = req.body.amount;
                    if (req.body.type) update.type = req.body.type;
                    if (req.body.description) update.description = req.body.description;
                    if (req.body.date) update.date = req.body.date;
                    Transaction.findByIdAndUpdate(transaction.id, update, { new: true })
                        .then(doc => {
                            Category.findById(doc.category)
                                .then(category => {
                                    const payload = {
                                        id: doc.id,
                                        category: category.name,
                                        icon: category.icon,
                                        amount: doc.amount,
                                        type: doc.type,
                                        description: doc.description,
                                        date: doc.date
                                    }
                                    return res.json(payload)
                                })
                        })
                }
            })
            .catch(err => res.json('Nothing updated'))
    }
)

router.delete('/delete',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Transaction.findByIdAndDelete(req.body.id)
            .then(() => res.json('Transaction deleted'))
    }
)

module.exports = router