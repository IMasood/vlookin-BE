let Notification = require('./notificationSchema')

async function addNotification({
    title,
    description,
    buildingId,
    notifyee 
 }) {
    try {
      let addNotification = await Notification.create({
        title,
        description,
        buildingId,
        notifyee 
        });
      return { data: addNotification, status: 200 };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  module.exports={
    addNotification
  }