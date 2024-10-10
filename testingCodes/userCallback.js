const fetchUserDataCallback=(id, func)=>{
    setTimeout(()=>{
        id===1 ? func(null,{id:1,name:"saday"}) : func('User not found');
    },1000);
};

module.exports = {fetchUserDataCallback,};