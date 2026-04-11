class CustomErrorHaddler extends Error{
    constructor(message){
        super(message)
    }
}

module.exports = CustomErrorHaddler;