const request = require('supertest');
const app = require('./index');
const sequelize=require('./database');
const mock = require('./models/studentModel');
const testData = require('./testingData/testData');
const expectedResponses = require('./expectedResponses/responses');

jest.mock('./models/studentModel');

beforeAll(async () => {
    await sequelize.sync({ force: false });
});

afterAll(async () => {
    await sequelize.close(); 
});

describe('Testing API Endpoints',()=>{
    let id;
    beforeEach(()=>{
        jest.clearAllMocks();
        studentID =1;
    });
    test('/Get request to get all students',async()=>{
        mock.findAll.mockResolvedValue(testData.students);
        const res = await request(app).get('/student');
        expect(res.statusCode).toBe(200);
        expect(res.body.students).toEqual(expectedResponses.allStudents);
    });
    test('/Post request to post data on the server',async()=>{
        mock.create.mockResolvedValue({id:1,...testData.newStudent});
        const response = await request(app).post('/student').send(testData.newStudent);
        expect(response.statusCode).toBe(201);
        expect(response.body.student).toEqual(expectedResponses.postStudent);
    });
    test('PUT /student/:id - should update student details', async () => {
        mock.update.mockResolvedValue([1]); 
        mock.findByPk.mockResolvedValue({ ...testData.updateDetails, id: studentID }); 
        const response = await request(app)
            .put(`/student/${studentID}`) 
            .send(testData.updateDetails);
        expect(response.body).toHaveProperty('student');
        expect(response.body.student.firstName).toBe(expectedResponses.updatedStudent.student.firstName); 
    });
    test('DELETE /student/:id - should delete a student', async () => {
        mock.destroy.mockResolvedValue([1]);
        const response = await request(app).delete(`/student/${studentID}`);
        expect(response.statusCode).toBe(204);
        expect(response.body).toEqual({});
    });
});