const fs = require('fs');

class ConfigReader {

    static getConfig() {

        const config =
            fs.readFileSync(
                './config/config.json',
                'utf8'
            );

        return JSON.parse(config);
    }
}

module.exports = ConfigReader;