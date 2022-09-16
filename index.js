require("express-async-errors");
require("dotenv").config();

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const express = require("express");
const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

const authenticationMiddleware = require("./middleware/authenticator");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.send("<h1>ESOP Postgres API</h1><a href='api-docs'>Documentation</a>");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
const authRouter = require("./routes/auth");
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
const shareTransactionTypesRouter = require("./routes/share_transaction_types");
const schemeCategoriesRouter = require("./routes/scheme_categories");
const schemesRouter = require("./routes/schemes");

// endpoints provided
app.use("/api/v1/login", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tenants", authenticationMiddleware, tenantsRouter);
app.use(
  "/api/v1/account-statuses",
  authenticationMiddleware,
  accountStatusRouter
);
app.use(
  "/api/v1/company-groups",
  authenticationMiddleware,
  companyGroupsRouter
);
app.use("/api/v1/companies", authenticationMiddleware, companiesRouter);
app.use("/api/v1/resources", authenticationMiddleware, resourcesRouter);
app.use("/api/v1/resources", authenticationMiddleware, resourcesRouter);
app.use(
  "/api/v1/resource-actions",
  authenticationMiddleware,
  resourceActionsRouter
);
app.use("/api/v1/roles", authenticationMiddleware, rolesRouter);
app.use("/api/v1/permissions", authenticationMiddleware, permissionsRouter);
app.use(
  "/api/v1/company-shares",
  authenticationMiddleware,
  companySharesRouter
);
app.use("/api/v1/genders", authenticationMiddleware, gendersRouter);
app.use("/api/v1/employees", authenticationMiddleware, employeesRouter);
app.use(
  "/api/v1/scheme-contribution-options",
  authenticationMiddleware,
  schemeContributionOptionsRouter
);
app.use(
  "/api/v1/scheme-eligibility-types",
  authenticationMiddleware,
  schemeEligibilityTypesRouter
);
app.use(
  "/api/v1/share-transaction-types",
  authenticationMiddleware,
  shareTransactionTypesRouter
);
app.use(
  "/api/v1/scheme-categories",
  authenticationMiddleware,
  schemeCategoriesRouter
);
app.use("/api/v1/schemes", authenticationMiddleware, schemesRouter);

const PORT = process.env.PORT || 5000;

app.use(errorHandlerMiddleware);

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
