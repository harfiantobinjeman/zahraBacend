import { HasMany, Sequelize } from "sequelize";
import db from "../config/Database.js";
import Loket from "../models/LoketModels.js"

const {DataTypes} = Sequelize;

const AntrianDMModels = db.define('antrianDM',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    idAntrianM:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    noAntrian:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty:false,
        }
    },
    idLoket:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty:false,
        }
    },
},{
    freezeTableName:true
});

Loket.hasMany(AntrianDMModels);
AntrianDMModels.belongsTo(Loket,{foreignKey:'idLoket'})

export default AntrianDMModels;