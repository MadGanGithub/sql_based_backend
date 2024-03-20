import { Sequelize,DataTypes } from "sequelize";

const sequelize = new Sequelize('test', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define your Sequelize model
const StockData = sequelize.define('Stock', {
    ticker: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    revenue: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fcf: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    capex: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
  timestamps: false
},
{
  tableName: "stock",
});

sequelize.sync();

// Export the model for use in other modules
export default StockData;
