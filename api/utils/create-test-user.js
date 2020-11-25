const { User } = require('../src/models/user.model');
const Role = require('../src/configs/role.config');
const bcrypt = require('bcryptjs');

module.exports = async function createTestUser() {
    // create test user if the db is empty
    try {
        if ((await User.countDocuments({})) < 2) {
            const newRoot = new User({
                name: 'Root User',
                nik: 'root000011112222',
                email: 'root@gmail.com',
                password: await bcrypt.hash('password', 12),
                role: Role.Root,
                updatedAt: Date.now(),
                lastLogin: Date.now(),
            });

            const newAdmin = new User({
                name: 'Admin User',
                nik: 'admin000011112222',
                email: 'admin@gmail.com',
                password: await bcrypt.hash('password', 12),
                role: Role.Admin,
                updatedAt: Date.now(),
                lastLogin: Date.now(),
            });

            const newUser = new User({
                name: 'Regular User',
                nik: 'user000011112222',
                email: 'user@gmail.com',
                password: await bcrypt.hash('password', 12),
                role: Role.User,
                updatedAt: Date.now(),
                lastLogin: Date.now(),
            });

            const testUser = new User({
                name: 'Test User',
                nik: 'test000011112222',
                email: 'test@gmail.com',
                password: await bcrypt.hash('password', 12),
                role: Role.User,
                updatedAt: Date.now(),
                lastLogin: Date.now(),
            });

            await Promise.all([
                await newRoot.save(),
                await newAdmin.save(),
                await newUser.save(),
                await testUser.save()
            ])
        }
    } catch (error) {
        throw error
    }
};
