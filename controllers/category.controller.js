const categoryModel = require("../models/category.model.js");


exports.createNewCategory = async (req, res)=>{

    // Create the category

    const categoryData = {
        name: req.body.name,
        description: req.body.description
    }

    try {
        const category = await categoryModel.create(categoryData);
        return res.status(200).send(category);
        
    } catch (error) {
        console.log("Error! While creating the category");
        return res.status(500).send({
            messsage: "Error! while creating the category"
        })
        
    }
    
}