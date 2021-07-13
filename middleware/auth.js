const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send("A token is required for Authentication")
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        req.user = decoded
    } catch (error) {
        return res.status(401).send("Invalid Token")
    }

    next()
}

module.exports = verifyToken;