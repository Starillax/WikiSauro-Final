const axios = require('axios');

const searchPkmn = async (id) => {

    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    try {

        const answer = await axios.get(URL);

        return answer.data;

    } catch (error) {

        console.log({ error });
        return null;

    }
}

module.exports = { searchPkmn };