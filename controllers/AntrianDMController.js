import AntrianDMModels from "../models/AntrianDMModels.js";
import Loket from "../models/LoketModels.js"
import { Sequelize } from "sequelize";

export const getAntrianDM = async(req, res) =>{
    const NOW = new Date();
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    //console.log(NOW)
    try {
        const Op = Sequelize.Op;
        const response = await AntrianDMModels.findAll({
            attributes:['uuid', 'idAntrianM','noAntrian','keterangan'],
            include:[{
                model:Loket,
                attributes:['namaLoket']
            }],
            where:{
                keterangan: {
                    [Op.ne]:null
                },
                [Op.or]:[{
                    keterangan:"panggil"
                }, {keterangan:"menunggu"}
                ],
                idLoket:{
                    [Op.ne]:null
                },
                createdAt: { 
                    [Op.gt]: TODAY_START,
                    [Op.lt]: NOW
                },
            },
            order: [[
                'updatedAt', 'DESC'
            ]],
            limit:3
        })
        //console.log(response)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getAntrianDMS = async(req, res) =>{
    const NOW = new Date();
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    try {
        const Op = Sequelize.Op;
        const response = await AntrianDMModels.findAll({
            attributes:['uuid', 'idAntrianM','noAntrian','keterangan'],
            include:[{
                model:Loket,
                attributes:['namaLoket']
            }],
            where:{
                keterangan: {
                    [Op.ne]:null
                },
                [Op.or]:[{
                    keterangan:"panggil"
                }, {keterangan:"menunggu"}
                ],
                idLoket:{
                    [Op.ne]:null
                },
                [Op.and]:[{
                    createdAt: { 
                        [Op.gt]: TODAY_START,
                        [Op.lt]: NOW
                    },
                }]
            },
            order: [[
                'updatedAt', 'DESC'
            ]],
            limit:3,
            offset:3
        })
        //console.log(response)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getAntrianNull = async(req, res) =>{
    const NOW = new Date();
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    try {
        const Op = Sequelize.Op;
        const response = await AntrianDMModels.findAll({
            attributes:['uuid', 'idAntrianM','noAntrian','keterangan'],
            include:[{
                model:Loket,
                attributes:['namaLoket']
            }],
            where:{
                keterangan: {
                    [Op.is]:null
                },
                idLoket:{
                    [Op.is]:null
                },
            },
            order: [[
                'createdAt', 'ASC'
            ]],
            [Op.and]:[{
                createdAt: { 
                    [Op.gt]: TODAY_START,
                    [Op.lt]: NOW
                },
            }],
            limit:1,
        })
        //console.log(response)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


export const getAntrianDMById = async(req, res) =>{
    try {
        const response = await AntrianDMModels.findOne({
            attributes:['uuid', 'idAntrianM','noAntrian','keterangan','idLoket'],
            where:{
                uuid:req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

//done
export const createAntrianDM = async(req, res) =>{
    const {idAntrianM,noAntrian} = req.body;

    const antrianDM = await AntrianDMModels.findOne({
        attributes:['noAntrian','createdAt'],
        where:{
            idAntrianM:idAntrianM
        },
        order: [[
            'createdAt', 'DESC'
        ]],
    });    
    const NOW = new Date();
    
    //console.log(`ini tanggal date ${tanggalDate} dan ini tanggal date now ${tanggalDateNow}`);
    if (antrianDM == null) {
        try {
            await AntrianDMModels.create({
                idAntrianM:idAntrianM,
                noAntrian:parseInt(1),
            });
            res.status(201).json({msg: `Register Berhasil , ${idAntrianM + parseInt(1)}`});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
    } else {
    // const tanggalDate = antrianDM.createdAt.getDate()
    // const tanggalDateNow = NOW.getDate()
        if (!NOW) {
            try {
                await AntrianDMModels.create({
                    idAntrianM:idAntrianM,
                    noAntrian:parseInt(1),
                });
                res.status(201).json({msg: `Register Berhasil , ${idAntrianM + parseInt(1)}`});
            } catch (error) {
                res.status(400).json({msg: error.message});
            }
        } else {
            try {
                await AntrianDMModels.create({
                    idAntrianM:idAntrianM,
                    noAntrian:parseInt(antrianDM.noAntrian) + 1,
                });
                res.status(201).json({msg: `Register Berhasil , ${idAntrianM}, ${parseInt(antrianDM.noAntrian) + 1}`});
            } catch (error) {
                res.status(400).json({msg: error.message});
            }
        }
    }
}
//done
export const updateAntrianDM = async(req, res) =>{
    const antrianDM = await AntrianDMModels.findOne({
        attributes:['uuid', 'idAntrianM','noAntrian','keterangan','idLoket'],
        where:{
            uuid:req.params.id
        }
    });
    if(!antrianDM) return res.status(404).json({msg:"Antrian DM Tidak Di temukan"});
    const {
        idAntrianM,
        noAntrian,
        keterangan,
        idLoket
    } = req.body;
    try {
        await AntrianDMModels.update({
            idAntrianM:idAntrianM,
            noAntrian:noAntrian,
            keterangan:keterangan,
            idLoket:idLoket

        },{
            where: {
                uuid : antrianDM.uuid
            }
        });
        res.status(200).json({msg: "Update Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
//done
export const deletAantrianDM = async(req, res) =>{
    const antrianDM = await AntrianDMModels.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!antrianDM) return res.status(404).json({msg:"Antrian DM Tidak Di temukan"});
    try {
        await AntrianDMModels.destroy({
            where: {
                id : antrianDM.id
            }
        });
        res.status(200).json({msg: "Antrian DM Berhasil delete"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}