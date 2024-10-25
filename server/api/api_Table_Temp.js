const express = require("express");
const router = express.Router();
const user = require("../database/models/user");

// GET endpoint to fetch all records from Table_Temp
router.get("/Table_Temp_result", async (req, res) => {
  try {
    console.log(`Received request to fetch all data from /Table_Temp`);

    // Construct the SQL query to fetch all data
    const fetchQuery = `
        SELECT [id], [lable_process], [use_lable], [Database_Number], [column_line]
        FROM [Web_I4].[dbo].[Table_Temp]
    `;

    // Execute the query and get the result
    const result = await user.sequelize.query(fetchQuery, {
      type: user.sequelize.QueryTypes.SELECT // Specify that we are selecting data
    });

    // Check if any data is returned
    if (result.length > 0) {
      res.json({
        api_result: "ok",
        data: result, // Return all matching records
      });
    } else {
      res.json({
        api_result: "nok",
        message: "No data found",
      });
    }
  } catch (error) {
    console.log("Error occurred while fetching data:", error);
    res.json({
      error,
      api_result: "nok",
    });
  }
});

router.put("/Table_Temp/:id", async (req, res) => {
  const { id } = req.params; // Destructure id from params
  const { use_lable, Database_Number, column_line } = req.body; // Destructure the request body

  try {
    console.log(`Received request to update /Table_Temp for id: ${id}`);

    // Check if the record exists
    const checkQuery = `SELECT COUNT(*) as count FROM [Web_I4].[dbo].[Table_Temp] WHERE [id] = ?`;
    const [recordExists] = await user.sequelize.query(checkQuery, {
      replacements: [id],
    });

    if (recordExists[0].count === 0) {
      return res.status(404).json({
        message: "Record not found",
        api_result: "nok",
      });
    }

    // Construct the SQL query for updating the specified columns
    const updateQuery = `
      UPDATE [Web_I4].[dbo].[Table_Temp]
      SET 
        [use_lable] = COALESCE(?, [use_lable]),
        [Database_Number] = COALESCE(?, [Database_Number]),
        [column_line] = COALESCE(?, [column_line])
      WHERE 
        [id] = ?  -- Using id from params
    `;

    // Execute the query with the provided values
    await user.sequelize.query(updateQuery, {
      replacements: [use_lable, Database_Number, column_line, id],
    });


    // Respond with a success message and the updated record
    res.status(200).json({
      message: "Update successful",
      api_result: "ok",
    
    });
  } catch (error) {
    console.error("Error occurred during update:", error);

    // Respond with an error message
    res.status(500).json({
      error: error.message || "An unknown error occurred",
      api_result: "nok",
    });
  }
});



module.exports = router;
