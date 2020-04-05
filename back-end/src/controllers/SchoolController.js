const connection = require('../database/connection')


module.exports = {
    async index(request, response) {
        const schools = await connection('schools').select('*');

        return response.json(schools);
    },

    async create(request, response) {
    const { description, address, email, telephone } = request.body;

    const schools = await connection('schools').insert({
        description,
        address,
        email,
        telephone,
    });

    return response.json(schools);
       
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('schools').where('id', id).delete();

        return response.status(204).send();
    },

    async update(request, response) {
        const { id } = request.params;
        const { description, address, email, telephone } = request.body;

        await connection('schools').where('id', id).update({description, address, email, telephone});

        return response.status(204).send();
    },


};
