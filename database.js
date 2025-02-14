import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    //await dbRun("DROP TABLE plants")
    await dbRun("CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, perennial BOOL, category TEXT, price INT)");

    const plants = [
        { name: "Hóvirág", parennial: true, category: "virág", price: "2000 Ft"},
        { name: "Tuja", parennial: true, category: "bokor", price: "7000 Ft"},
        { name: "Barackfa", parennial: false, category: "fa", price: "11000 Ft"},
        { name: "Aranyeső", parennial: false, category: "bokor", price: "4000 Ft"},
    ];

    for (const plant of plants) {
        await dbRun("INSERT INTO plants (name, parennial, category, price) VALUES (?, ?, ?, ?)", [plant.name, plant.parennial, plant.category, plant.price]);
    }
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };