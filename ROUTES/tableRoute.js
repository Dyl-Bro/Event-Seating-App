const express = require('express');
const router = express.Router();
const {Table} = require ('../MODELS/tables');

router.post(`/`,  async (req, res) => {
    let table = new Table({
        name: req.body.name,
        guests: req.body.guests
    })
    table = await table.save();
    if(!table){
        return res.status(400).send('order cant be created. ');
    }
    res.send(table);
    
});
router.get(`/:id`, async(req, res) => {
    const table = await Table.findById(req.params.id);
    if(table){
        return res.status(200).send(table)
    } else {
        return res.status(404).json({success: false, message: 'Table not found.'})
    }
});

router.put(`/:id`, async (req, res) => {
    const table = await Table.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            guests: req.body.guests
        },
        {new: true}
    )
    if(!table){
        res.status(500).json({message: 'Table id not recognized. Table connot be updated '})
    }
    res.status(200).send(table);
})
router.delete(`/:id`, (req, res)=> {
    Table.findByIdAndRemove(req.params.id).then(table => {
        if(table){
            return res.status(200).json({success: true, message: 'table successfully deleted!'})
        } else{
            return res.status(404).json({success: false, message:'table not found' })
        }
    }).catch(err=> {
        return res.status(400).json({success: false, error: err})
    })
});

    

module.exports = router;