const fetchUserData=async (userID)=>{
    const response = await fetch(`https://api.example.com/users/${userID}`);
    return response.json();
};

module.exports=fetchUserData;