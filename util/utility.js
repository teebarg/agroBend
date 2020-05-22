const {
    Op
} = require("sequelize");

class Utility {
    static getImageFromBase64(e) {
        return new Buffer(e.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    }

    static buildQuery(e) {

        return {
            name: {
                [Op.like]: `%${req.query.name}%`,
            },
            categoryId: req.query.categoryId
        }
        return new Buffer(e.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    }

    static buildAnObjectFromAQuery(query) {
        return ({
            ...query.name && {
                name: {
                    [Op.like]: `%${query.name}%`,
                }
            },
            ...query.categoryId && {
                categoryId: query.categoryId
            },
        });
    }
}

module.exports = Utility;