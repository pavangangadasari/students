const jwt = require('jsonwebtoken')

const isUserAuthorized = (req,res,next) => {
    try{
        // req.headers.authorization
        if(req.headers.authorization) {
            const token = req.headers.authorization 
            console.log(jwt.verify(token,'s3cret'))
            req.currentUser = jwt.verify(token,'s3cret')
            
            console.log(req.currentUser)
            next()
            return
        }
        else {
            res.json({
                error: "Error: Please Sign In"
            })
        }
    } catch {
        res.json({
            error: "Error: Unauthorized Request"
        })
    }
}

module.exports = isUserAuthorized