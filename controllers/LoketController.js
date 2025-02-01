import LoketModels from "../models/LoketModels.js";

export const getLoket = async(req, res) =>{
    try {
        const response = await LoketModels.findAll({
            attributes:['uuid', 'namaLoket','keterangan'],
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getLoketById = async(req, res) =>{
    const loket = await LoketModels.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!loket) return res.status(404).json({msg:"Antrian M Tidak Di temukan"});
    try {
        const response = await LoketModels.findOne({
            attributes:['uuid', 'namaLoket','keterangan'],
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
export const createLoket = async(req, res) =>{
    const namaLoket = req.body.namaLoket;
    const loket = await LoketModels.findOne({
        where:{
            namaLoket:namaLoket
        }
    });
    if(!loket){
        const {namaLoket} = req.body;
        try {
            await LoketModels.create({
                namaLoket: namaLoket,
            });
            res.status(201).json({msg: "Loket M Berhasil di Tambahkan"});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
    }else{
        return res.status(404).json({msg:"Loket Sudah Ada"})
    }
}
//done
export const updateLoket = async(req, res) =>{
    const loket = await LoketModels.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!loket) return res.status(404).json({msg:"Loket Tidak Di temukan"});
    const {namaLoket} = req.body;
    try {
        await LoketModels.update({
            namaLoket:namaLoket,
        },{
            where: {
                uuid : loket.uuid
            }
        });
        res.status(200).json({msg: "Update Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
//done
export const deleteLoket = async(req, res) =>{
    const loket = await LoketModels.findOne({
        where:{
            uuid:req.params.id
        }
    });
    if(!loket) return res.status(404).json({msg:"Loket Tidak Di temukan"});
    try {
        await LoketModels.destroy({
            where: {
                id : loket.id
            }
        });
        res.status(200).json({msg: "Loket Berhasil delete"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}