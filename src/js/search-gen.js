const axios = require('axios');

const searchGen = async (gen) => {

    const URL = `https://pokeapi.co/api/v2/pokedex/${gen}/`;

    try {

        const answer = await axios.get(URL);
        const gen = answer.data;

        return {
            'pkmn': gen.pokemon_entries,
            'name': gen.name
        };

    } catch (error) {

        console.log({ error });
        return null;

    }
}

module.exports = { searchGen };