const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
  } catch (e) {
    console.log(`Error: ${e.message}`.red.underline.bold)

    process.exit(1)
  }
}

module.exports = connectDB
