const { ObjectId } = require("mongodb");
const VirtualizationEnv = require("../../models/material_resources/virtualization_env");


/** Add VirtualizationEnv */
module.exports.addVirtEnv = async function (req, res, next) {
    try {
        const virtualizationEnv = new VirtualizationEnv({
            label: req.body.label,
           
        })
        const v = await virtualizationEnv.save();
        console.log("virtualization-Env added succefully")
        res.status(200).json(v);
    
    }catch (error) {
        res.status(500).json("internal server error: " + error.message);
    }
}

/** Delete VirtualizationEnv */
module.exports.deleteVirtEnv = async function (req, res, next) {
    try {
    const virtualizationEnv =await VirtualizationEnv.findByIdAndDelete(
        {
            _id : req.params.id
        })
        console.log("Virtualization-Env deleted succefully")
        res.status(200).json("Virtualization-Env deleted succefully");
        
    
    }catch (error) {
        res.status(404).json("Virtualization-Env not found" + error.message);
    }
}
/** getAllVirtualizationEnvs  */
module.exports.getAllVirtsEnv = async function (req, res, next) {
    try {
        const virtualizationEnv =await VirtualizationEnv.find()
        res.status(200).json(virtualizationEnv);
        console.log(virtualizationEnv);
            
    }catch (error) {
        res.status(500).json("internal server error: " + error.message);
    }
}
/** getVirtualizationEnvById  */
module.exports.getVirtEnvById = async function (req, res, next) {
    try {
    const virtualizationEnv =await VirtualizationEnv.findById({
        _id: req.params.id
    })
        res.status(200).json(virtualizationEnv);
        console.log(virtualizationEnv);
        
    }catch (error) {
        res.status(404).json("virtualization-Env not found" + error.message);
    }
}