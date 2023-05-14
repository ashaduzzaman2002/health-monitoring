const SmartWatchData = require('../models/SmartWatchData')


exports.uploadData = async (req, res) => {
    const {bloodPresure, heartRate} = req.body
    const userId = req.userId

    try {
        let newData = new SmartWatchData({
            heartRate,
            bloodPresure,
            user: userId
        })

        await newData.save()
        res.json({success: true, msg: 'Data added to cloud'})
    } catch (error) {
        console.log(error);
    }
}


exports.getData = async (req, res) => {
    const userId = req.userId

    try {
        const data = await SmartWatchData.find({user: userId})
        if(!data) return res.status(404).json({msg: 'No data found'})

        res.json({success: true, data})
    } catch (error) {
        console.log(error);
    }
}