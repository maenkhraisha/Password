import mongoose from "mongoose";

const DBConn = async () => {
    const database_Uri = process.env.DB_URL;
    try {
        await mongoose.connect(database_Uri, {
            serverApi: { version: "1", strict: true, deprecationErrors: true },
        });
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.log(err);
    }
};

export default DBConn;
