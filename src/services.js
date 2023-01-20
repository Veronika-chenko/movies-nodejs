const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid')

const dbPath = path.resolve(__dirname,'./db/movies.json');

async function readDB() {
    const dbRaw = await fs.readFile(dbPath)
    const db = JSON.parse(dbRaw);
    return db;
}

async function writeDB(db) {
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2))
}

async function getMovies({limit = 0}) {
    const db = await readDB(); 
    return db.slice(-limit);
}

async function getMovieById(id) {
    const db = await readDB(); 
    const movie = db.find(m => m.id === id);
    return movie || null;
}

async function addMovie(title) {
    const id = uuidv4();
    const movie = { id, title };

    const db = await readDB();
    db.push(movie);
    await writeDB(db);
    return movie;
}

async function removeMovie(id) {
    const db = await readDB();
    const updateDB = db.filter(movie => movie.id !== id);
    await writeDB(updateDB);
}

module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    removeMovie
}