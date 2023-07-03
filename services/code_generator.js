const bcrypt = require ('bcrypt')

function buildingCode(buildingName) {
    buildingName = buildingName.toUpperCase()
    let nameArray = buildingName.split(" ");
    
    let buildingCode = '';
    
    buildingCode += nameArray[0][0]
    buildingCode += nameArray[0][1]
    buildingCode += nameArray[0][2]
    if (nameArray.length > 1) {
        nameArray.shift()
        nameArray.forEach((elem) => {
        buildingCode += elem[0];
    });
    }
    buildingCode += Math.floor(Math.random() * 1000);
    return buildingCode
}



async function OTP_generator() {
  //generate and return 4 digit hashed OTP 
  let OTP_Code = Math.floor(1000 + Math.random() * 9000).toString();
  let hashedOTP = await bcrypt.hash(OTP_Code, 5);
  return ({OTP_Code, hashedOTP})

}




module.exports = {
  buildingCode,
  OTP_generator
};
