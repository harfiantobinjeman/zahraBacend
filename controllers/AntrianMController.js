import AntrianMModels from "../models/AntrianMModels.js";


export const getAntrianM = async(req, res) =>{
    try {
        const response = await AntrianMModels.findAll({
            attributes:['uuid', 'namaAntrian','keterangan'],
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


export const getAntrianMById = async(req, res) =>{
    const antrianM = await AntrianMModels.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!antrianM) return res.status(404).json({msg:"Antrian M Tidak Di temukan"});
    try {
        const response = await AntrianMModels.findOne({
            attributes:['uuid', 'namaAntrian','keterangan'],
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
export const createAntrianM = async(req, res) =>{
    const namaAntrian = req.body.namaAntrian;
    const antrianM = await AntrianMModels.findOne({
        where:{
            namaAntrian:namaAntrian
        }
    });
    if(!antrianM){
        const {namaAntrian} = req.body;
        try {
            await AntrianMModels.create({
                namaAntrian: namaAntrian,
            });
            res.status(201).json({msg: "Antrian M Berhasil di Tambahkan"});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
    }else{
        return res.status(404).json({msg:"Antrian Sudah Ada"})
    }
}
//done
export const updateAntrianM = async(req, res) =>{
    const antrianM = await AntrianMModels.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!antrianM) return res.status(404).json({msg:"Antrian M Tidak Di temukan"});
    const {namaAntrian} = req.body;
    try {
        await AntrianMModels.update({
            namaAntrian:namaAntrian,
        },{
            where: {
                uuid : antrianM.uuid
            }
        });
        res.status(200).json({msg: "Update Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
//done
export const deleteAntrianM = async(req, res) =>{
    const antrianM = await AntrianMModels.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!antrianM) return res.status(404).json({msg:"Antrian M Tidak Di temukan"});
    try {
        await AntrianMModels.destroy({
            where: {
                id : antrianM.id
            }
        });
        res.status(200).json({msg: "Antrian M Berhasil delete"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}