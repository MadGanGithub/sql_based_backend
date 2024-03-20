import { Sequelize } from "sequelize";
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
    // console.log(req.query)
    const columns = req.query.column.split(',');
    console.log(columns)
    var col=[]
    for(var i=0;i<columns.length;i++){
      col.push(columns[i])
    }
    // console.log(typeof(columns))
    // const users = await StockData.findAll();
    
    // console.log(users)

    const one = await StockData.findAll({
      where: { ticker: req.query.ticker },
      attributes: [...col]
    });
    
    console.log(one)

    // const users=await StockData.create({
    //   ticker: 'AAPL', // Example ticker symbol
    //   date: '2022-04-01', // Example date
    //   revenue: 1000000, // Example revenue
    //   gp: 500000, // Example gp
    //   fcf: 200000, // Example fcf
    //   capex: 100000 // Example capex
    // });

    res.status(200).send({
      status: true,
      message: one,
      logged: true,

    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

function parseDates(date){
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString() // Month is zero-based
  const year = date.getFullYear().toString();

  const formattedDate = `${month}/${day}/${year}`;
  console.log(formattedDate)
  return formattedDate;
}

const fetchSpecificDataByPeriod = async (req, res) => {
  try {
    const columns = req.query.column.split(',');
    const timeperiod = parseInt(req.query.period);
    let dateCondition = {}
    var col = []

    if (columns) {
      for (var i = 0; i < columns.length; i++) {
        col.push(columns[i])
      }
    }

    const currentDate = new Date();
    const startDate = new Date(currentDate);

    if (timeperiod) {
      startDate.setFullYear(currentDate.getFullYear() - timeperiod);
      dateCondition = {
        date: {
          [Sequelize.Op.between]: [parseDates(startDate), parseDates(currentDate)]
        }
      };
    }

    const users = await StockData.findAll({
      where: {
        ticker: req.query.ticker,
        ...dateCondition
      },
      attributes: ['ticker', 'date', ...col]
    });

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
