"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../db");
const create = (product, callback) => {
    const queryString = "INSERT INTO product (name, description, instock_quantity,price) VALUES (?, ?, ?, ?)";
    db_1.db.query(queryString, [product.name, product.description, product.instockQuantity, product.price], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (productId, callback) => {
    const queryString = `
      SELECT *
      FROM Product
      WHERE id=?`;
    db_1.db.query(queryString, productId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const product = {
            id: row.id,
            name: row.name,
            description: row.description,
            instockQuantity: row.instock_quantity,
            price: row.price
        };
        callback(null, product);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `
      SELECT *
      FROM Product
     `;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const products = [];
        rows.forEach(row => {
            const product = {
                id: row.id,
                name: row.name,
                description: row.description,
                instockQuantity: row.instock_quantity,
                price: row.price
            };
            products.push(product);
        });
        callback(null, products);
    });
};
exports.findAll = findAll;
const update = (product, callback) => {
    const queryString = `UPDATE Product SET name=?, description=?, instock_quantity=?, price=? WHERE id=?`;
    db_1.db.query(queryString, [product.id, product.name, product.description, product.instockQuantity, product.price], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
