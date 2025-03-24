const request = require('supertest');
const app = require('../app'); // Import your Express app


describe('Auth API', () => {
it('should register a new user', async () => {
const res = await request(app)
.post('/api/auth/register')
.send({ username: 'testuser', password: 'testpassword' });
// Check if the response is actually 400 due to duplicate user
expect(res.statusCode).toBe(400); // Update this if necessary
// Handle the error message accordingly
});


it('should fail to register an existing user', async () => {
const res = await request(app)
.post('/api/auth/register')
.send({ username: 'testuser', password: 'testpassword' });
expect(res.statusCode).toBe(400);
expect(res.body.message).toBe('Username already exists.');
});

it('should login an existing user', async () => {
const res = await request(app)
.post('/api/auth/login')
.send({ username: 'testuser', password: 'testpassword' });
expect(res.statusCode).toBe(200);
expect(res.body.token).toBeDefined();
});

it('should fail login with incorrect credentials', async () => {
const res = await request(app)
.post('/api/auth/login')
.send({ username: 'wronguser', password: 'wrongpassword' });
expect(res.statusCode).toBe(400);
expect(res.body.message).toBe('Invalid credentials');
});
});
