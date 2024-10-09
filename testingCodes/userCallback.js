const fetchUserData = (id,callback)=>{
    setTimeout(()=>{
        if(id===1){
            callback(null,{id:1,name:"saday"});
        }else{
            callback('User not found');
        }
    },1000);
};

module.exports = fetchUserData;