const jwt = require('jsonwebtoken');
const { secret } = require('config.json');
const db = require('database/db');

module.exports = authorize;

function authorize() {
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        async (req, res, next) => {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, secret);

                // attach decoded token to request object
                req.user = decodedToken;

                // check if the user still exists in the database
                const user = await db.User.findByPk(decodedToken.sub);

                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }

                // check if the user is an admin
                if (user.role !== 'admin') {
                    return res.status(403).json({ message: 'Forbidden' });
                }

                // authorization successful
                next();
            } catch (error) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }
    ];
}
