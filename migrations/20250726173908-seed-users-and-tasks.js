const bcrypt = require("bcrypt");

module.exports = {
  async up(db) {
    const hashedPassword = await bcrypt.hash("task@1234", 10);

    const { insertedId: userId1 } = await db.collection("users").insertOne({
      name: "test1",
      email: "test1@gmail.com",
      password: hashedPassword,
    });

    const { insertedId: userId2 } = await db.collection("users").insertOne({
      name: "test2",
      email: "test2@gmail.com",
      password: hashedPassword,
    });

    await db.collection('tasks').insertMany([
      { name: 'This task belongs to test1', user_id: userId1, completed: false },
      {name: 'This task belongs to test2', user_id: userId2, completed: false}
    ])
  },

  async down(db) {
    await db.collection('users').deleteMany({
      email: { $in: ["test1@gmail.com", "test2@gmail.com"] }
    });

    await db.collection('tasks').deleteMany({
      name: { $in: ['This task belongs to test1', 'This task belongs to test2']}
    })
  },
};
