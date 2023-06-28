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

module.exports = {
  buildingCode,
};
