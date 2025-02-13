const User = require('../models/user')

const viewDetails = async(req,res) => {
    try
    {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({ message: 'User not found' })
        else res.status(200).json({
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            gender: user.gender,
            date_of_birth: user.date_of_birth,
            country: user.country
        })
    }
    catch(error)
    {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

module.exports = {viewDetails}