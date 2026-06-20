const fs = require('fs');

class DataParser {

    static readJSON(filePath) {

        const data =
            fs.readFileSync(
                filePath,
                'utf8'
            );

        return JSON.parse(data);
    }

}

module.exports = DataParser;