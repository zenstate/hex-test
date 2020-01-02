const productionConfig = require('./config');

module.exports = Object.assign(productionConfig, {
    OUTPUT_DIR: '../../docs',
});
