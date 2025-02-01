import { Sequelize } from "sequelize";

const db = new Sequelize ('antrian_db', 'root', '', {
    host:"localhost",
    dialect:"mysql",
    timezone: '+05:30',
});

export default db;