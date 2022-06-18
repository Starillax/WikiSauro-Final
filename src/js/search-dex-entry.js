const axios = require('axios');

const searchDexEntry = async (id) => {

    const URL = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    try {

        const answer = await axios.get(URL);

        for (i =0; i < answer.data.flavor_text_entries.length; i++) {

            let entry = answer.data.flavor_text_entries[i].language.name;

            if (entry == 'en') {
                return answer.data.flavor_text_entries[i].flavor_text;
            }

        }

    } catch (error) {

        console.log({ error });
        return null;

    }
}

module.exports = { searchDexEntry };