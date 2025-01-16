const express = require("express");
const router = express.Router();
const user = require("../database/models/user");

router.get("/dropdown_Division", async (req, res) => {
  try {
    let Division = await user.sequelize.query(`
  select distinct Division from [Web_I4].[dbo].[Side_manu_web]
  union 
  select 'Engineer'`);
    console.log(Division);

    let Details = await user.sequelize.query(`
    select 'Monitoring' as Details 
    union
    select 'Traceability'
    union 
    select 'Report'
    union 
    select 'Analysis requester'`);
    console.log(Details);

    res.json({
      Division: Division[0],
      Details: Details[0],
      api_result: "ok",
    });
  } catch (error) {
    res.json({
      error,
      api_result: "nok",
    });
  }
});

router.post("/api_insert_sidemenu", async (req, res) => {
  try {
    const { Division, Details, path, name, Icon, updateby } = req.body;

    // Handle potential NULL values
    const divisionValue = Division ? `'${Division}'` : 'NULL';
    const detailsValue = Details ? `'${Details}'` : 'NULL';
    const pathValue = path ? `'${path}'` : 'NULL';
    const nameValue = name ? `'${name}'` : 'NULL';
    const iconValue = Icon ? `'${Icon}'` : 'NULL';
    const updatebyValue = updateby ? `'${updateby}'` : 'NULL';

    let api_add_sidemenu = await user.sequelize.query(
      `
    INSERT INTO [Web_I4].[dbo].[Side_manu_web]
      ([Division], [Details], [path], [name], [icon], [updateby], [datetime])
    VALUES 
      (${divisionValue}, ${detailsValue}, ${pathValue}, ${nameValue}, ${iconValue}, ${updatebyValue}, GETDATE());
    `,
    );

    res.json({
      api_add_sidemenu: api_add_sidemenu[0],
      api_result: "ok",
    });
  } catch (error) {
    res.json({
      error,
      api_result: "nok",
    });
  }
});


router.get("/Engineer", async (req, res) => {
  try {
    console.log("Received request at /Engineer"); // Log เมื่อมีการเรียกใช้งาน endpoint นี้

    let api_Engineer = await user.sequelize.query(`
        SELECT [path], [name],[Details],[icon],type
        FROM [Web_I4].[dbo].[Side_manu_web]
        WHERE [Division] = 'Engineer'`);


    let api_PCMC = await user.sequelize.query(`
      SELECT [path], [name],[Details],[icon],type
      FROM [Web_I4].[dbo].[Side_manu_web]
      WHERE [Division] = 'PCMC'`);



    let api_Quality = await user.sequelize.query(`
    SELECT [path], [name],[Details],[icon],type
    FROM [Web_I4].[dbo].[Side_manu_web]
    WHERE [Division] = 'Quality'`);



    let api_Production = await user.sequelize.query(`
  SELECT [path], [name],[Details],icon,type
  FROM [Web_I4].[dbo].[Side_manu_web]
  WHERE [Division] = 'Production'`);

    let api_PEMM = await user.sequelize.query(`
  SELECT [path], [name],[Details],icon,type
  FROM [Web_I4].[dbo].[Side_manu_web]
  WHERE [Division] = 'PEMM'`);

    let api_Data_analysis = await user.sequelize.query(`
  SELECT [path], [name],[Details],icon,type
  FROM [Web_I4].[dbo].[Side_manu_web]
  WHERE [Division] = 'Data_analysis'`);



    res.json({
      api_Engineer: api_Engineer[0],
      api_PCMC: api_PCMC[0],
      api_Quality: api_Quality[0],
      api_Production: api_Production[0],
      api_PEMM: api_PEMM[0],
      api_Data_analysis: api_Data_analysis[0],
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

module.exports = router;
