import { Sequelize } from "sequelize";

const sequelize = new Sequelize('test', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false
  },
  {
    tableName: "users",
  }
);

sequelize.sync();

export default User;
