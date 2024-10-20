/**const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./module/user");

app.post("/signup", async, async (req, res) => {
    const user = new User({
        firstName: "swapnil",
        lastName: "chougule",
        gmailId: "swapnilchougule.com",
        password: "swapnil@123",
    });

    await user.save();
    res.send("User Added Successfully");
});

connectDB()
.then(() => {
    console.log("database connection established");
    app.listen(3000, () => {
        console.log("Server is Listening Successfully on 3000 port...");
    });
})
.catch((err) => {
    console.error("database cannot connected",err.message);
})

*/

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./module/user");

app.post("/signup", async (req, res) => {
  try {
    // Create a new User instance
    const user = new User({
      firstName: "swapnil",
      lastName: "chougule",
      gmailId: "swapnilchougule.com",
      password: "swapnil@123",
    });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.send("User Added Successfully");
  } catch (error) {
    // Catch and handle any errors
    res.status(500).send("Error while adding user: " + error.message);
  }
});

// Start the server after connecting to the database
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });
