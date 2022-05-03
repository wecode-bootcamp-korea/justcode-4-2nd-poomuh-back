const errUtils = require("../utils/errUtils");

const keyErrorEstate = async (req, res, next) => {
  try {
    const {
      address_main,
      address_dong,
      address_ho,
      latitude,
      longitude,
      supply_size,
      exclusive_size,
      building_floor,
      current_floor,
      available_date,
      description_title,
      description_detail,
      price_main,
      price_deposit,
      price_monthly,
      heat_id,
      category_id,
    } = req.body;
    const requiredKey = {
      address_main,
      address_ho,
      latitude,
      longitude,
      supply_size,
      exclusive_size,
      building_floor,
      current_floor,
      available_date,
      description_title,
      description_detail,
      heat_id,
      category_id,
    };

    //전세월세 가격이 둘다 안들어왔을때
    if (!price_main && !price_deposit) {
      throw errUtils.errGenerator({
        statusCode: 400,
        message: "KeyError : Price",
      });
    }
    // 보증금가격은 들어왔는데 월세가 없을때
    if (price_deposit && !price_monthly) {
      throw errUtils.errGenerator({
        statusCode: 400,
        message: "KeyError : monthly",
      });
    }

    for (const key in requiredKey) {
      if (!requiredKey[key]) {
        throw errUtils.errGenerator({
          statusCode: 400,
          message: `KeyError: ${key}`,
        });
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

const keyErrorLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw errUtils.errGenerator({
        statusCode: 500,
        message: "KeyError",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

const keyErrorSignUp = async (req, res, next) => {
  try {
    const { email, password, username, nickname } = req.body;

    const obj = { email, password, username, nickname };

    for (const key in obj) {
      if (!obj[key]) {
        throw errUtils.errGenerator({
          statusCode: "400",
          message: `KEY_ERROR_${key}`,
        });
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { keyErrorEstate, keyErrorLogIn, keyErrorSignUp };
