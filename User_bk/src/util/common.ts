const fetch = require('node-fetch');
import {servicePaths} from '../util/constant';

export const cleanOrder = async id => {
    try {
      const response = await fetch(servicePaths.CATALOG_SERVICE_PATH,{
        method: 'POST',
        body: JSON.stringify({ "id":id }),
        headers: { 'Content-Type': 'application/json' }
    });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
