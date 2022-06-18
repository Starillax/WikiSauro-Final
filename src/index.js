const express = require("express");
const axios = require('axios');
const { searchGen } = require("./js/search-gen");
const { searchPkmn } = require("./js/search-pkmn");
const { searchDexEntry } = require("./js/search-dex-entry");
const app = express();

app.use(express.static('public/index.html'));
app.use(express.urlencoded({
    extended: true,
}));

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/index', async (req, res) => {
    return res.render('index');
})

app.post('/search', async (req, res) => {

    const { gen } = req.body;
    const results = await searchGen(gen);

    if (results) {

        return res.render('results', {pkmn: results['pkmn'], name: results['name']});
    }
    return res.send("Oops, generation not found!");
});

app.get('/details/:id', async (req, res) => {

    const { id } = req.params;
    const results = await searchPkmn(id);
    const results2 = await searchDexEntry(id);

    if (results && results2) {
        const sprite = results.sprites.front_default;
        const name = results.species.name;
        const number = results.id;
        const types = results.types;
        const abilities = results.abilities;
        const stats = results.stats;
        return res.render('details', {sprite: sprite, name: name, number: number, types: types, abilities: abilities, stats: stats, entry: results2});
    }
    return res.send("Oops, pokémon not found!");
});

app.get('/', async (req, res) => {
    res.redirect('/index');        
});

const PORT = process.env.PORT ||5000;
 
app.listen(PORT, console.log(
  `Server started on port ${PORT}`));