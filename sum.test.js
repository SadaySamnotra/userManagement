const add = require('./testingCodes/sum');
const fetch = require('node-fetch');
const {getPost} = require('./testingCodes/api');
const logActivity = require('./testingCodes/logger');
const performAction = require('./testingCodes/app');
const fetchUserData = require('./testingCodes/user');
const {fetchUserDataCallback} = require('./testingCodes/userCallback');

test('fetches user data successfully',async()=>{

    const mockFetchUserData = jest.fn().mockResolvedValue({id:1,name:'Alice'});
    const userData = await mockFetchUserData(1);
    expect(mockFetchUserData).toHaveBeenCalledWith(1);
    expect(userData).toEqual({id:1,name:'Alice'});
    
});

test('adds 1 and 2 to equal 3',()=>{
    const result = add(1,2);
    expect(result).toBe(3);
});

jest.mock('node-fetch');
test('fetches a post successfully',async()=>{
    fetch.mockResolvedValue({
        json:jest.fn().mockResolvedValue({id:1,title:'Mocked Post'})
    });
    const post = await getPost(1);
    expect(post).toEqual({id:1,title:'Mocked Post'});
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
});

jest.mock('./testingCodes/logger');
test('logs activity when performing an action',()=>{
    performAction('test action');
    expect(logActivity).toHaveBeenCalledWith('User performed: test action');
});

test('Testing an asyncronous function by making a new promise',()=>{
    return fetchUserData(1).then((data)=>{
        expect(data).toEqual({id:1,name:"saday"});
    });
});

test('Testing the asynchronous function by making a bad request',()=>{
    return fetchUserData(2).catch((error)=>{
        expect(error).toBe('User not found');
    });
});

test('Testing the same asynchronous above, but now with async await(correct functioning test)',async()=>{
    const data=await fetchUserData(1);
    expect(data).toEqual({id:1,name:"saday"});
});

test('Testing the same asynchronous above, but now with async and await(passing wrong parameters)',async()=>{
    try{
        await fetchUserData(2);
    }catch(error){
        expect(error).toBe('User not found');
    };
});

test('Test for callback using done() in the case the function fails',(done)=>{
    fetchUserDataCallback(2,(error,data)=>{
        expect(error).toBe('User not found');
        expect(data).toBeUndefined();
        done();
    });
});

test('Test for callback using done()',(done)=>{
    fetchUserDataCallback(1,(error,data)=>{
        expect(data).toEqual({id:1,name:"saday"});
        expect(error).toBeNull();
        done();
    });
});