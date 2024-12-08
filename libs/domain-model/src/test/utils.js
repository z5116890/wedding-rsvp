"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutdownDb = exports.clearTables = exports.suiteName = exports.chance = void 0;
const _ = require("lodash");
const Chance = require("chance");
const path = require("path");
const sequelize_1 = require("sequelize");
const index_1 = require("../app/index");
exports.chance = new Chance();
const suiteName = (file) => path.relative(`${__dirname}/../..`, file).split(path.sep).join('#');
exports.suiteName = suiteName;
const clearTables = () => {
    return Promise.resolve()
        .then(() => {
        return index_1.sequelize.transaction((t) => {
            return index_1.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { transaction: t })
                .then(() => {
                return Promise.all(_.map(index_1.sequelize.models, (m) => {
                    return index_1.sequelize.query(`TRUNCATE TABLE ${m.tableName}`, { type: sequelize_1.QueryTypes.RAW, transaction: t });
                }));
            })
                .then(() => index_1.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { transaction: t }));
        });
    });
};
exports.clearTables = clearTables;
const shutdownDb = () => {
    return Promise.resolve().then(() => { return index_1.sequelize.close(); });
};
exports.shutdownDb = shutdownDb;
//# sourceMappingURL=utils.js.map