const logActivity = require('./logger');
function performAction(action){
    logActivity(`User performed: ${action}`);
}
module.exports=performAction;