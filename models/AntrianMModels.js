import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const AntrianMModel = db.define('antrianM',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    namaAntrian:{
        type: DataTypes.STRING,
        allowNull: true,
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
},{
    freezeTableName:true
});


export default AntrianMModel;