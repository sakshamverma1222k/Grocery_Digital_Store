export const ApplicationConstant = {
    STATUS_SUCCESS: 200,
    STATUS_SUCCESS_REGISTER_MESSAGE: 'User registered successfully',
    STATUS_ALREADY_REGISTERED: 409,
    STATUS_ALREADY_REGISTERED_MESSAGE: 'User already registered successfully',
    STATUS_ALREADY_REGISTERED_MESSAGE_TYPE: 'Either This Username is taken OR User already registered with this Email & or Mobile',
    STATUS_NOT_FOUND:404,
    STATUS_NOT_FOUND_MESSAGE:'Wrong query , please try aagain',
    STATUS_LOGIN_NOT_FOUND:404,
    STATUS_LOGIN_NOT_FOUND_MESSAGE:'Wrong username or password , please try again',
    STATUS_LOGIN_SUCCSS_MESSAGE:'Login successfull',
    STATUS_SUCCESS_ORDER_MESSAGE:'Your order has been successfuly processed',
    STATUS_FAILED_ORDER_MESSAGE:'Your order has not been processed !!'
};

export const servicePaths = {
   CATALOG_SERVICE_PATH : "http://localhost:3001/catalog/clean"
};