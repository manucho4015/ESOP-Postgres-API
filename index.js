require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const userRouter = require("./routes/users");
const tenantsRouter = require("./routes/tenants");
const accountStatusRouter = require("./routes/account_statuses");
const companyGroupsRouter = require("./routes/company_groups");
const companiesRouter = require("./routes/companies");
const resourcesRouter = require("./routes/resources");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tenants", tenantsRouter);
app.use("/api/v1/account-statuses", accountStatusRouter);
app.use("/api/v1/company-groups", companyGroupsRouter);
app.use("/api/v1/companies", companiesRouter);
app.use("/api/v1/resources", resourcesRouter);

const PORT = 5000 || process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
