const maintenanceModel = require("./maintenanceModel.js");
const tenantModel = require("../tenant/dal/tenantModel.js");
const code_generator = require("../../services/code_generator.js");
const { uploadToCloudinary } = require("../../services/media/uploadFile.js")


async function addComplaint(req, res) {
  try {
    let { category, description, createdBy, tenantId, status } = req.body;
    let {images = []} = req.files
    let imageList= []
    let tenantDetails, complaintCount, complaintId;
    Promise.all([
      (tenantDetails = await tenantModel.getTenant({ id: tenantId })),
      (complaintCount = await maintenanceModel.maintenanceCount({ tenantId })),
    ]).then(
      (complaintId = code_generator.complaintCode({
        tenantId,
        flatNo: tenantDetails.flatNo,
        tenantContact: tenantDetails.contact, 
        complaintCount,
      }))
    );


    //upload  images
    if (images.length) {
      let imageUploadResult = await uploadImages(images);
      imageList = imageUploadResult.map((upload) => ({
        imageId: upload.public_id,
        url: upload.secure_url,
      }));
      
    }


    let newMaintenance = await maintenanceModel.addComplaint({
      category,
      description,
      createdBy,
      tenantId,
      complaintId,
      status,
      imageList
    });

    res.status(200).send({
      message: "Successfully added complaint.",
      data: newMaintenance,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      response: "failed to add complaint",
      message: err.message,
    });
  }
}

async function getComplaints(req, res) {
  try {
    let {id, all} = req.query
    let data = await maintenanceModel.getComplaints({ id, all });
     res.status(200).send({
       message: "Successfully fetched complaint.",
       data: data,
     });

  } catch (err) {
    res.status(500).send({
      message: "Failed to get Complaints",
      error: err.message,
    });
  }
}


async function updateComplaint(req, res) {
  try {
    let { id } = req.query;
    let {category, description, createdBy, tenantId, status } = req.body;

    let updatedComplaint = await maintenanceModel.updateComplaint({
      id,
      category,
      description,
      createdBy,
      tenantId,
      status,
    });
    return res.status(200).send({
      message: "Complaint Updated Succesfully",
      status: 200,
      data: updatedComplaint,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}
async function deleteComplaint(req, res) {
  try {
    let { id } = req.query;

    let deleteComplaint = await maintenanceModel.deleteComplaint({ id });
    return res.status(200).send({
      message: "Complaint Deleted Succesfully",
      status: 200,
      data: deleteComplaint,
    });
  } catch (err) {
    res.status(500).send({
      message: "Delete failed",
      error: err.message,
      status: 500,
    });
  }
}

async function uploadImages(images) {
  try {
    console.log("Hello")
    let imagesPromises = images.map(
      async (image) =>
        await uploadToCloudinary({
          filePath: image.path,
          folder: "Services/Gallery",
        })
    );
    let imageUploadResponse = Promise.all(imagesPromises);
    return imageUploadResponse;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  addComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
};
