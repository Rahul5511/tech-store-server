const request = require('supertest');
const express = require('express');
const { body, validationResult } = require('express-validator');
const userRoute = require('../routes/userRoute'); // Adjust path
const createUser = require('../models/userCreation'); // Adjust path based on your model

// Mock the createUser model
jest.mock('../models/userCreation');

// Set up an Express app for testing
const app = express();
app.use(express.json());
app.use('/api', userRoute);

describe('User Creation API', () => {
  
  // Test for validation errors
  it('should return 400 for invalid user input', async () => {
    const response = await request(app).post('/api/user/create').send({
      userName: 'usr', // too short
      email: 'invalid-email', // invalid email
      password: '1234' // too short
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "username must be at least 5 characters long" }),
        expect.objectContaining({ msg: "please provide a valid email" }),
        expect.objectContaining({ msg: "Password must be at least 8 characters long" }),
      ])
    );
  });

  // Test when the user already exists
  it('should return 400 if user already exists', async () => {
    // Mock createUser.findOne to simulate existing user
    createUser.findOne.mockResolvedValue({ email: 'test@example.com' });

    const response = await request(app).post('/api/user/create').send({
      userName: 'validUser',
      email: 'test@example.com',
      password: 'validpassword'
    });

    expect(response.status).toBe(400);
    expect(response.text).toBe("user already exists");
  });

  // Test for successful user creation
  it('should create a new user and return 201', async () => {
    // Mock findOne to return null (no existing user) and mock save
    createUser.findOne.mockResolvedValue(null);
    createUser.prototype.save = jest.fn().mockResolvedValue();

    const response = await request(app).post('/api/user/create').send({
      userName: 'newUser',
      email: 'newuser@example.com',
      password: 'newpassword123'
    });

    expect(response.status).toBe(201);
    expect(response.text).toBe("user created successfully");
  });

  // Test for server error handling
  it('should return 500 if there is a server error', async () => {
    // Mock findOne to throw an error
    createUser.findOne.mockRejectedValue(new Error('Database error'));

    const response = await request(app).post('/api/user/create').send({
      userName: 'errorUser',
      email: 'error@example.com',
      password: 'errorpassword123'
    });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal server error");
  });
});
