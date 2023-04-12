const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const { check, validationResult } = require('express-validator');

router.post('/', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please Enter a Valid Email').isEmail(),
    check('password', 'Please Enter a password of 6 or more characters').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }

        // res.send(req.body);

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exist' });
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            // res.send('User Saved Successfully');

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                });

        } catch (err) {
            console.log(err.message);
            res.send(500).send('Server Error');
        }
    });
module.exports = router;