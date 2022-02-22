const express = require('express');
const router = express.Router();
const {seatArrangement} = require('../MODELS/seatArrangement');
const {User} = require('../MODELS/user');
const {Table} = require('../MODELS/tables');

router.post(`/`,  async (req, res) => {
    const TableIds = Promise.all(req.body.tables.map(async table => {
        let newTable = new Table({
            name: table.name,
            guests: table.guests
        })

        newTable = await newTable.save();
        return newTable._id;
    }))
    const resolvedTableIds = await TableIds;
    let seatarrangement = new seatArrangement({
        eventName: req.body.name,
        user: req.body.user,
        tables : resolvedTableIds
    })
    seatarrangement = await seatarrangement.save();

    if(!seatarrangement){
        return res.status(400).send('seatingArrangement cant be created. ');
    }
    res.send(seatarrangement);
});
router.get(`/:userid`, async(req, res) => {
    const userArrangementList = await seatArrangement.find({user: req.params.userid})
    .populate({
        path: 'tables',
        model: 'Table',
        populate: 'guests'
    }).populate('user', 'name');

    if(!userArrangementList){
        res.status(500).json({success:false, message: true})
    }
    res.send(userArrangementList);
});

router.get(`/:id`, async(req, res) => {
    const seatArr = await seatArrangement.findById(req.params.id)
    .populate({
        path: 'tables',
        model: 'Table',
        populate: 'guests'
    }).populate('user', 'name');

    if(!seatArr){
        res.status(500).json({success:false})
    }
    res.send(seatArr);
});
router.put(`/:id`, async (req, res) => {
    const seatarrangement = await seatArrangement.findByIdAndUpdate(
        req.params.id,
        {
            eventName: req.body.name,
            user: req.body.user
        },
        {new: true}
    )
    if(!seatarrangement){
        res.status(500).json({messgage: 'No Seat Arrangement with given id.'})
    }
    res.status(200).send(seatarrangement);
});

router.delete(`/:id`, async (req, res)=> {
    seatArrangement.findByIdAndRemove(req.params.id).then(seatarrangement => {
        if(seatarrangement){
            return res.status(200).json({success: true, message: 'Seating Arrangement was successfully deleted'})
        } else {
            return res.status(404).json({success: false, message: 'Seating Arrangement failed to be deleted'})
        }
    }).catch( err => {
        return res.status(500).json({success: false, error: err})
    })
})



module.exports = router;
