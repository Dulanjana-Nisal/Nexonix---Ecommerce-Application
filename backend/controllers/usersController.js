const userSignup = (req,res)=>{
    res.status(200).send('User signup')
}

const userSignin = (req,res)=>{
    res.status(200).send('User signin')
}

module.exports = {
    userSignup,
    userSignin
}
