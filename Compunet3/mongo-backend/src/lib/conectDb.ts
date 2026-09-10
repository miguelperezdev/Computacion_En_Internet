const connectionString: string = "mongodb://root:password@localhost:27017";
import mongoose from "mongoose";
export const dbInstance = mongoose.connect(connectionString, { 
    dbName: "icesi"  // Mongoose usa dbName en lugar de idName
})
.then(() => {
    console.log("Connected to MongoDB");
    return mongoose.connection; // Retorna la conexión
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    throw error;
});