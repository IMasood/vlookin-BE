const bcrypt = require('bcrypt')
const moment = require ("moment")

function buildingCode(buildingName) {
    buildingName = buildingName.toUpperCase()
    let nameArray = buildingName.split(" ");
    
    let buildingCode = '';
    
    buildingCode += nameArray[0].slice(0, 3)
    if (nameArray.length > 1) {
        nameArray.shift()
        nameArray.forEach((elem) => {
        buildingCode += elem[0];
    });
    }
    buildingCode += Math.floor(Math.random() * 10000);
    return buildingCode
}

function complaintCode({buildingCode, flatNo, complaintCount, tenantContact}) {
  let complaintId = `COMP/${flatNo && flatNo}/${moment().format("YY-MM-DD")}/${tenantContact && tenantContact.slice(-4)}/${complaintCount}`;

  return complaintId
}



async function OTP_generator() {
  //generate and return 4 digit hashed OTP 
  let OTP_Code = Math.floor(1000 + Math.random() * 9000).toString();
  let hashedOTP = await bcrypt.hash(OTP_Code, 5);
  return ({OTP_Code, hashedOTP})

}




module.exports = {
  buildingCode,
  OTP_generator,
  complaintCode
};
