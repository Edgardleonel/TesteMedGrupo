const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('class').count();

        const classe = await connection('class')
        .join('schools', 'schools.id', '=', 'class.schools_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'class.*', 
            'schools.description',
            'schools.address',
            'schools.email',
            'schools.telephone'
            ]);

        response.header('X-Total-Count', count['count(*)'])

        return response.json(classe);

    },

    async create(request, response) {
        const { title, quantity } = request.body;
        const schools_id = request.headers.authorization;

        const [id] = await connection('class').insert({
            title,
            quantity,
            schools_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const schools_id = request.headers.authorization;

        const classe = await connection('class')
        .where('id', id)
        .select('schools_id')
        .first();

        if (classe.schools_id !== schools_id) {
            return response.status(401).json({ error: 'Operation not permitted.'  })
        }

        await connection('class').where('id', id).delete();

        return response.status(204).send();
    },

}