const express = require('express');
const router = express.Router();
const storeSchema = require('../schemas/store');
const userSchema = require('../schemas/user');
const { checkToken } = require('../helper/authHelper');
const Config = require('../config');
const jwt = require('jsonwebtoken');

router.get('/get-all', async (req, res, next)=> {
    try {
        const stores = await storeSchema.find({});
        return res.send({ stores });
    }
    catch (err) {
        return res.status(500).send({error: 'Internal server error occurred!'});
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const { name, parent } = req.body;
        if(!name){
            return res.status(400).send({ error: 'name is required field!' })
        }
        const store = await storeSchema.create({ name, parent });
        res.status(200).send({message: 'Store created!', store});
    }
    catch (err) {
        return res.status(500).send({error: 'Internal server error occurred!'});
    }
});

router.put('/update/:id', async (req, res, next) => {
    try {
        const { name, parent } = req.body;
        if(!name){
            return res.status(400).send({ error: 'name is required field!' })
        }
        const { id } = req.params;
        let obj = {};
        if (name) obj.name = name;
        if (parent) obj.parent = parent;
        await storeSchema.findByIdAndUpdate(id, { $set: obj });
        return res.status(200).send({message: 'Store updated!'});
    }
    catch (err) {
        return res.status(500).send({error: 'Internal server error occurred!'});
    }
});

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await storeSchema.findByIdAndRemove(id);
        return res.status(200).send({message: 'Store deleted!'});
    }
    catch (err) {
        return res.status(500).send({error: 'Internal server error occurred!'});
    }
});

router.get('/get-all-employees-for-node', checkToken, async (req, res, next) => {
    try {
        await getAdminEmployeesManagers({ req, res, role: 'employee' });
    }
    catch (err) {
        return res.status(500).send({error: 'Internal server error occurred!'});
    }
})
router.get('/get-all-managers-for-node', checkToken, async (req, res, next) => {
    try {
        await getAdminEmployeesManagers({ req, res, role: 'manager' });
    }
    catch (err) {
        return res.status(500).send({error: 'Internal server error occurred!'});
    }
})
router.get('/get-all-managers-for-node-with-descendants', checkToken, async (req, res, next) => {
    try {
        await getAdminEmployeesManagers({ req, res, role: 'manager', fGetDescendants: true });
    }
    catch (err) {
        return res.status(500).send({error: 'Internal server error occurred!'});
    }
})
router.get('/get-all-employees-for-node-with-descendants', checkToken, async (req, res, next) => {
    try {
        await getAdminEmployeesManagers({ req, res, role: 'employee', fGetDescendants: true });
    }
    catch (err) {
        return res.status(500).send({error: 'Internal server error occurred!'});
    }
})

const getAdminEmployeesManagers = ({ req, res, role, fGetDescendants = false }) => {
    const { storeId } = req.query;
    jwt.verify(req.token, Config.jwtPrivateKey, async (err, authorizedData) => {
        if (err || authorizedData.role !== 'admin') {
            console.log('ERROR');
            res.sendStatus(403);
        } else {
            var store = await storeSchema.findOne({ _id: storeId });
            if (!store) return res.send('Store not found!');
            let users = [];
            if (fGetDescendants) {
                var descendants = [storeId];
                var stack = [];
                console.log("stor=", store);
                stack.push(storeId);
                while (stack.length > 0) {
                    var currentnode = stack.pop();
                    var children = await storeSchema.find({ parent: currentnode });
                    console.log("children", children);

                    for (let i = 0; i < children.length; i++) {
                        var child = children[i];
                        descendants.push(child._id);
                        stack.push(child._id);
                    }
                }
                users = await userSchema.find({ role, storeId: { $in: descendants } });
            }
            else {
                users = await userSchema.find({ role, storeId });
            }
            users = users && users.map(user => {
                const { firstName, lastName, role, gender, storeId, email } = user;
                return {
                    firstName, lastName, role, gender, storeId, email
                }
            });
            res.json(users);
        }
    })
}

module.exports = router;
