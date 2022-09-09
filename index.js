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
const resourceActionsRouter = require("./routes/resource_actions");
const rolesRouter = require("./routes/roles");
const permissionsRouter = require("./routes/permissions");
const companySharesRouter = require("./routes/company_shares");
const gendersRouter = require("./routes/genders");
const employeesRouter = require("./routes/employees");
const schemeContributionOptionsRouter = require("./routes/scheme_contribution_options");
const schemeEligibilityTypesRouter = require("./routes/scheme_eligibility_types");

// endpoints provided
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tenants", tenantsRouter);
app.use("/api/v1/account-statuses", accountStatusRouter);
app.use("/api/v1/company-groups", companyGroupsRouter);
app.use("/api/v1/companies", companiesRouter);
app.use("/api/v1/resources", resourcesRouter);
app.use("/api/v1/resources", resourcesRouter);
app.use("/api/v1/resource-actions", resourceActionsRouter);
app.use("/api/v1/roles", rolesRouter);
app.use("/api/v1/permissions", permissionsRouter);
app.use("/api/v1/company-shares", companySharesRouter);
app.use("/api/v1/genders", gendersRouter);
app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/scheme-contribution-options", schemeContributionOptionsRouter);
app.use("/api/v1/scheme-eligibility-types", schemeEligibilityTypesRouter);

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
