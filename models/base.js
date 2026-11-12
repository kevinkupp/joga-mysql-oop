const conn = require('../utils/db')

class BaseSQLModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async executeQuery(query, params) {
        const [results] = await conn.query(query, params);
        return results;
    }

    async findAll() {
        const query = 'SELECT * FROM ??'
        const results = await this.executeQuery(query, [this.tableName])
        return results
    }

    async findById(id) {
        const query = 'SELECT * FROM ?? WHERE ?? = ?'
        const results = await this.executeQuery(query, [this.tableName, 'id', id])
        return results[0]
    }

    async findOne(where, value) {
        const query = 'SELECT * FROM ?? WHERE ?? = ?'
        const results = await this.executeQuery(query, [this.tableName, where, value])
        return results[0]
    }

    async findMany(where, value) {
        const query = 'SELECT * FROM ?? WHERE ?? = ?'
        const results = await this.executeQuery(query, [this.tableName, where, value])
        return results
    }

    async create(data) {
        const query = 'INSERT INTO ?? SET ?'
        const result = await this.executeQuery(query, [this.tableName, data])
        return result.insertId
    }

    async update(id, data) {
        const query = 'UPDATE ?? SET ? WHERE ?? = ?'
        const result = await this.executeQuery(query, [this.tableName, data, 'id', id])
        return result.affectedRows
    }

    async delete(id) {
        const query = 'DELETE FROM ?? WHERE ?? = ?'
        const result = await this.executeQuery(query, [this.tableName, 'id', id])
        return result.affectedRows
    }
}

module.exports = BaseSQLModel
