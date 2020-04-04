const connection = require('../database/connection')
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const schools = await connection('schools').select('*');

        return response.json(schools);
    },

    async create(request, response) {
    const { description, address, email, telephone } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('schools').insert({
        id,
        description,
        address,
        email,
        telephone,
    });

    return response.json({ id });
       
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('schools').where('id', id).delete();

        return response.status(204).send();
    },

};
