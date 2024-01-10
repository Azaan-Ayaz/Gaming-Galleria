const categoryModel = require("../models/categoryModel")
// import Register from './../../Frontend/src/Pages/Auth/Register';
const slugify = require("slugify")

const categoryController = async(req,res) => {
try {
    const {name} = req.body
    if(!name){
        return (
            res.status(401).send({message:"Name is required"})
        )
    }
    const existingCategory = await categoryModel.findOne({name})
    if (existingCategory){
        return(
            res.status(200).send({
                success: true,
                message: "Category Already Exists"
            })
        )
    }
    const category = await new categoryModel({name, slug:slugify(name)}).save()
    res.status(201).send({
        success: true,
        message:"New category created",
        category
    })

} catch (error) {
    console.log(error)
    res.status(300).send({
        success: false,
        message: "Error in Category",
        error
    })
}
}


// Update Category 

const updateCategory = async(req,res)=>{
try {
    const {name} = req.body
    const {id} = req.params
    const category =  await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
    res.status(200).send({
        success: true,
        message: "Category Updated Successfully",
        category
    })
} catch (error) {
    console.log(error)
    res.status(400).send({
        success: false,
        message: "Error while updating Category",
        error
    })
}
}

// get all category
const CategoryController = async(req,res) => {
try {
    const category = await categoryModel.find({})
    res.status(200).send({
        success: true,
        category
    })
} catch (error) {
    console.log(error)
    res.status(400).send({
        success: false,
        error,
        message: "Cannot get the Data"
    })
}
}

// get Single category
const singleCategory = async (req, res) => {
    try {
    //   const { id } = req.params;
    console.log(req.params)
      const category = await categoryModel.findOne({slug:req.params.slug  });
      res.status(200).send({
        success: true,
        category,
      });
    } catch (error) {
      console.log(error);
      // Handle the error and send an appropriate response
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting single id",
      });
    }
  };
  
// Delte Category
const deteletCategory = async (req,res) => {
try {
    const {id} = req.params
    const Delete = await categoryModel.findByIdAndDelete({_id: id})
    res.status(200).send({
        success: true,
        message: "Data has been deleted",
        Delete
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: "Error while deleting id",
        error
    })
}
}

module.exports = {categoryController, updateCategory, CategoryController, singleCategory, deteletCategory}