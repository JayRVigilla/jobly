const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/expressError");
const Company = require("../models/company");
const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } = require("../httpStatusCodes")


/**  GET /companies {search, min_employees, max_employees}  
 * => {companies: [companyData, ...]} */

router.get("/", async function (req, res, next) {
  try {
    let { search, min_employees, max_employees } = req.query;

    // console.log("\n\n\n\n request.body is ", req.body);

    const companies = await Company.get({ search, min_employees, max_employees });

    if (companies.length === 0) throw new ExpressError("No companies found", NOT_FOUND);

    return res.json({ companies })

  } catch (err) {
    return next(err);
  }
})


/**  POST /companies 
 * 
 * { handle, name, num_employees, description, logo_url }  
 * => {company: [companyData]} */

router.post("/", async function (req, res, next) {
  try {
    let { handle, name, num_employees, description, logo_url } = req.body;
    const company = await Company.create({ handle, name, num_employees, description, logo_url });

    if (!company) throw new ExpressError("Company not created", BAD_REQUEST);

    return res.json({ company })

  } catch (err) {
    return next(err);
  }
})


/**  GET /companies/:handle
 * 
   * This should return a single company found by its id.
   * 
   * {handle} => {company: companyData}
   */

router.get("/:handle", async function (req, res, next) {
  try {
    let { handle } = req.params;
    const company = await Company.getByHandle({ handle });

    if (!company) throw new ExpressError("No company found", NOT_FOUND);

    return res.json({ company })

  } catch (err) {
    return next(err);
  }
})


/**  PATCH /companies/:handle
 * This should update an existing company and return the updated company.
 * 
 * takes { table, items }
 * 
 * returns JSON of {company: companyData}
 */

router.patch("/:handle", async function (req, res, next) {
  try {
    let { handle } = req.params;
    let { table, items } = req.body;
    let key = "handle";
    let id = handle;

    console.log("\n\n\n\n handle is ", handle);
    console.log("\n\n\n\n request.body is ", req.body);
    console.log("\n\n\n\n request.params is ", req.params);
    console.log("\n\n\n\n key is ", key);
    console.log("\n\n\n\n id is ", id);

    const company = await Company.update({ table, items, key, id });

    if (!company) throw new ExpressError("No company found", NOT_FOUND);

    return res.json({ company })

  } catch (err) {
    return next(err);
  }
})


module.exports = router;