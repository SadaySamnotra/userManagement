const fetchPromise = require('./sum');

test('the data is peanut butter',async()=>{
    const data = await fetchPromise();
    expect(data).toBe('peanut butter');
});