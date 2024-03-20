import StockData from "../models/stock.js";
import User from "../models/user.js";

//Signin
const testApi = async (req, res) => {
  try {
    const user = await User.create({
      user_id:"test",
      name:"madhav"
    })

    console.log(user)
    res.status(200).send({
      status: true,
      message: "Loggedin successfully",
      logged: true,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const fetchData = async (req, res) => {
  try {
    const user = await StockData.findAll()

    console.log(user)
    res.status(200).send({
      status: true,
      message: user,
      logged: true,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const fetchSpecificData = async (req, res) => {
  try {
    console.log(req.query)
    const columns = req.query.column.split(',');
    console.log(columns)
    console.log(typeof(columns))
    const users = await StockData.findAll({
      where: { ticker: req.query.ticker },
      attributes: ['ticker', 'revenue', 'gp'] // Specify the columns you want to fetch
    });
    
    console.log(users)
    res.status(200).send({
      status: true,
      message: users,
      logged: true,

    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const fetchSpecificDataByPeriod = async (req, res) => {
  try {
    const columns = req.query.column.split(',');
    const periodYears = parseInt(req.query.period); // Parse period as integer

    // Calculate the date X years ago from the current date
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setFullYear(currentDate.getFullYear() - periodYears);

    console.log(currentDate)
    console.log(startDate)

    // Fetch data between startDate and currentDate
    const users = await StockData.findAll({
      where: { 
        ticker: req.query.ticker,
        date: {
          [Sequelize.Op.between]: [startDate, currentDate]
        }
      },
      attributes: columns // Use the columns specified in the query
    });

    console.log(users)

    res.status(200).send({
      success: true,
      message: users,
      logged: true,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};


export {
  testApi,
  fetchData,
  fetchSpecificData,
  fetchSpecificDataByPeriod
};
