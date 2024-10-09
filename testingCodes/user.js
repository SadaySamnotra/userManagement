const fetchUser=(id)=>{
    return new Promise((resolve,reject)=>{
        if(id===1){
            resolve({id:1,name:"saday"});
        }else{
            reject('User not found');
        }
    })
};

module.exports=fetchUser;