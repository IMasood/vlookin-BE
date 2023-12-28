const Maintenance = require('./maintenanceSchema')

async function addComplaint({
    category,
    description,
    complaintId,
    createdBy,
    tenantId,
    status,
    imageList,
    buildingId
}) {
  try {
    let newComplaint = Maintenance.create({
      category,
      description,
      complaintId,
      createdBy,
      tenantId,
      status,
      images: imageList,
      buildingId
    });
    return newComplaint;
  } catch (err) {
    throw err;
  }
}

async function maintenanceCount({ tenantId, buildingId, flatNo }) {
  try {
    let maintenanceCount = await Maintenance.count({ tenantId })
    return maintenanceCount;
  } catch (err) {
    throw err;
  }
} 
async function getComplaints({all, id, tenantId}){
  try {
    let where = {};
    let response;
    if (id) {
      where._id = id;
    }
    if(tenantId) {
      console.log(tenantId);
      where.tenantId._id = tenantId
    }

    if (all) {
      response = await Maintenance.find(where).populate('tenantId', ['tenantName','contact', 'flatNo', 'email']);
      return response;
    }

    if(tenantId) {
      response = await Maintenance.find(tenantId).populate('tenantId', ['tenantName','contact', 'flatNo', 'email']);
      console.log(response);
      return response;
    }

    response = await Maintenance.findOne(where).populate("tenantId", [
      "tenantName",
      "contact",
      "flatNo",
      "email",
    ]);
    return response

  } catch (err) {
    throw err
  }

}
async function updateComplaint({
  id,
  category,
  description,
  createdBy,
  tenantId,
  status,
}) {
  try {
    let response = await Maintenance.findOneAndUpdate(
      { _id: id },
      {
        category,
        description,
        createdBy,
        tenantId,
        status,
      },
      { runValidators: true}
    );
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteComplaint({id}){
  try {
    
    let response = await Maintenance.findOneAndDelete({_id: id})
    return response

  } catch (err) {
    throw err
  }

}

module.exports = {
  addComplaint,
  maintenanceCount,
  getComplaints,
  updateComplaint,
  deleteComplaint,
};
