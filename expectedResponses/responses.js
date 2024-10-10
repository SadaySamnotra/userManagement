const testData=require('../testingData/testData');

const expectedResponses = {
    allStudents: [{ id: 1, firstName: "Saday", lastName: "Samnotra", email: "sadaysamnotra@gmail.com", age: 22 }],
    postStudent: { id: expect.any(Number), ...testData.newStudent },
    updatedStudent: { student: { id: 1, ...testData.updateDetails } },
};


module.exports = expectedResponses;
