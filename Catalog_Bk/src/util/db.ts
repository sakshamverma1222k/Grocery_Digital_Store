import * as mongoose from "mongoose";

const uri: string = "mongodb://127.0.0.1:27017/demand";

const dbConnection = mongoose.connect(uri, { useFindAndModify: false }, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected!");
  }
});
export default dbConnection