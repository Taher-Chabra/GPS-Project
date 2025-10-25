import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 3030;

connectDB()
   .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   })
   .catch((error) => {
      console.error("Failed to connect to the database:", error);
   });