const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const group = await connection('group').select('*');

        return response.json(group);
    },

    async create(request, response) {
        const { title, quantity, idSchool } = request.body;

        const group = await connection('group').insert({
            title,
            quantity,
            idSchool 
        });

        return response.json(group);
    },
    async delete(request, response) {
        const { id } = request.params;

        await connection('group').where('id', id).delete();

        return response.status(204).send();
    },
    async update(request, response) {
        const { id } = request.params;
        const { title, quantity } = request.body;

        await connection('group').where('id', id).update({title, quantity});

        return response.status(204).send();
    },

}