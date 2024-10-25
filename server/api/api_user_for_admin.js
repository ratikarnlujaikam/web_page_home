const express = require("express");
const router = express.Router();
const user = require("../database/models/user");
const app = express();
const { getToken } = require("../passport/jwtHandler"); //ทำ JWT ให้system
router.get("/User", async (req, res) => {
    try {
      console.log("Received request at /Engineer"); // Log เมื่อมีการเรียกใช้งาน endpoint นี้
  
      let api_User = await user.sequelize.query(`
    SELECT [username]
      ,[empNumber]
      ,[levelUser]
      ,[email]
      ,[position]
      ,[createdAt]
      ,[updatedAt]
  FROM [Web_I4].[dbo].[users]
        `);
  
      res.json({
        api_User: api_User[0],
        api_result: "ok",
      });
    } catch (error) {
      console.log("Error occurred:", error); // Log ข้อผิดพลาดถ้ามี
      res.json({
        error,
        api_result: "nok",
      });
    }
  });
  

  router.delete('/User_delete/:empNumber', async (req, res) => {
    const { empNumber } = req.params;
    const { userId } = req.body; // This is the ID of the user who is performing the delete operation
  
    console.log("Received empNumber:", empNumber);
    console.log("Received userId:", userId);
  
    const transaction = await user.sequelize.transaction();
  
    try {
      // Step 1: Insert the record into the deleted_users table
      await user.sequelize.query(`
        INSERT INTO [Web_I4].[dbo].[deleted_users] (
          [username], [empNumber], [password], [levelUser], [email], [position], [createdAt], [updatedAt], [deletedBy], [deletedAt]
        )
        SELECT
          [username], [empNumber], [password], [levelUser], [email], [position], [createdAt], [updatedAt], ?, GETDATE()
        FROM [Web_I4].[dbo].[users]
        WHERE [empNumber] = ?
      `, {
        replacements: [userId, empNumber],
        transaction
      });
  
      // Step 2: Delete the record from the original users table
      await user.sequelize.query(`
        DELETE FROM [Web_I4].[dbo].[users]
        WHERE [empNumber] = ?
      `, {
        replacements: [empNumber],
        transaction
      });
  
      // Commit the transaction
      await transaction.commit();
  
      res.json({ api_result: "ok" });
    } catch (error) {
      // Rollback the transaction in case of error
      await transaction.rollback();
      console.log("Error occurred:", error);
      res.status(500).json({ error, api_result: "nok" });
    }
  });
  
  
  const bcrypt = require('bcrypt');

  router.post("/login", async (req, res) => {
    try {
      const { empNumber, password } = req.body;
      
  
      // Validate input
      if (!empNumber || !password) {
        return res.status(400).json({
          login_result: "failed",
          message: "empNumber or password missing",
        });
      }
  
      // Find the user based on empNumber with levelUser as 'admin'
      let resultlogin = await user.findOne({
        where: {
          empNumber,
          levelUser: 'admin'
        }
      });
  
      // Check if user exists
      if (!resultlogin) {
        return res.status(404).json({
          login_result: "failed",
          message: "User not found or not an admin",
        });
      }
  
      // Compare passwords
      if (bcrypt.compareSync(password, resultlogin.password)) {
        // Generate a JWT token
        let jwtToken = await getToken({ empNumber });
  
        // Send response with token and user information
        res.json({
          jwt: jwtToken,
          login_result: "pass",
          resultlogin,
        });
      } else {
        res.status(401).json({
          login_result: "failed",
          message: "Invalid password",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({
        error: error.message,
        api_result: "nok",
      });
    }
  });
  
  

  
  
  module.exports = router;