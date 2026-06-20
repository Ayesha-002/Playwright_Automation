class Logger {

    static info(message) {
        console.log(`[INFO] ${message}`);
    }

    static error(message) {
        console.log(`[ERROR] ${message}`);
    }

    static warn(message) {
        console.log(`[WARN] ${message}`);
    }

}

module.exports = Logger;