const Category = require("./Category.model")

const createCategory = async(req,res)=>{
    try {
        const {name} = req.body
        const category = new Category({name})
        await category.save()
        res.status(201).json({
            success:true,
            message:`${category} created successfully`
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const allCategory = async(req,res)=>{
    try {
        const categories = await Category.find()
        res.status(200).json({
            success:true,
            categories
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const findCategory = async(req,res)=>{
    try {
        const {id} = req.params
        const category = await Category.findById(id)
        if(category){
            res.status(200).json({
                success:true,
                category
            })
        }else{
            res.status(404).json({
                success:false,
                message:` category not found by this id- ${id}`
            })
        }
        
    } catch (error) {
        
    }
}
module.exports = {
    createCategory,
    allCategory,
    findCategory
}