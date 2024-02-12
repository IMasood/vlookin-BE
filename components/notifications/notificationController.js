const htmlTemplate = require("../../services/emails/templates/tenantNotify");
const BuildingModel = require('../buildings/buildingModel')
const TenantModel = require('../tenant/dal/tenantModel')
const UserModel = require("../users/dal/userModel");
const notificationModel = require('./notificationModel');
// 2nd use csae
/**
 * admin want to send msg to all the tenants, so admin module ke liye 
 * new screen -> titile -> notify tenants -> 
 * choose msg, title, building id, tenant id (optional)
 * if no tenant id then send to all tenants -> 
 * if tenant id then send to respective tenants
 * 
 * second for super admin
 * superadmin will send notification to all on boarded admins
 * 
 */


async function notifyTenant (req, res)  {
    try {
        let {title, description, buildingId, notifyee,all, actionBy,  } = req.body;

        let tenantEmail;
        
        if(!all && actionBy == 'admin'){
            let tenant = await TenantModel.getTenant(buildingId);
            tenantEmail = tenant?.email;
        }
        if(all && actionBy == 'admin'){
            console.log(buildingId)
            let allTenants = await TenantModel.getTenant(buildingId);
            tenantEmail = allTenants.email; // array of user email
        }
        let building = await BuildingModel.getBuilding({id : buildingId});
        let buildingName = building?.buildingName;

        let html = htmlTemplate.tenant_notify_email({ title: title, description: description, buildingName: buildingName });
        let sendEmailResponse = await sendMail.sendEmail({ html, to: tenantEmail });
        // let notificationData = await notificationModel.addNotification({
        //     title, description, buildingId, notifyee, actionBy,
        //   });
        // console.log(sendEmailResponse)      
        res.status(200).send({
            status: 200,
            message: "Notification sent successfully",
            // data: notificationData,
          });

        
    } catch (error) {
        throw error;  
    }
}


async function notifyAdmin (req)  {
    try {
        let {title, description, buildingId, notifyee,all, actionBy,  } = req.body;
        let adminEmail;
        
        if(all && actionBy == 'superAdmin'){
            //get all users of selected admin 
            let allAdmins = UserModel.getUsers({buildingId, role:'admin'})
            // let allAdminEmails = allAdmins.map(());
        }
        if(!all && actionBy == trim(('superAdmin'))){
            let admins = UserModel.getUsers({buildingId, role:'admin'})
            adminEmail = admins?.email
        }
        let building = BuildingModel.getBuilding({id : buildingId});
        let buildingName = building?.buildingName;

        let html = htmlTemplate.tenant_notify_email({ title: title, description: description, buildingName: buildingName });
        let sendEmailResponse = await sendMail.sendEmail({ html, to: adminEmail });
        // console.log(sendEmailResponse)         
        res.status(200).send({
            status: 200,
            message: "Notification sent successfully",
            // data: notificationData,
          });
        
    } catch (error) {
        throw error;  
    }
}


module.exports = {
    notifyTenant,notifyAdmin
}
// basiclaly in this we will be notifying all the tenants
//one is to those who have tenancy expiry
//before 3 months of their tenancy expiry date -> notification will be sent

