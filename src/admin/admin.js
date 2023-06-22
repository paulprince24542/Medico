// var AdminJS = require("adminjs");
// var Connect = require("connect-pg-simple");
// var session = require("express-session");

// var { Plugin } = require("@adminjs/express");

// var AdminJSExpress = require("@adminjs/express");
// var { Adapter, Resource, Database } = require("@adminjs/sql");

// AdminJS.registerAdapter({
//   Database,
//   Resource,
// });

// var admin, adminRouter, router;

// var DEFAULT_ADMIN = {
//   email: "admin@example.com",
//   password: "password",
// };

// var authenticate = async (email, password) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };

// var start = async () => {
//   var db = await new Adapter("postgresql", {
//     connectionString: "postgresql://paulprince:fg@localhost:5432/medicalidem",
//     database: "medicalidem",
//   }).init();
//   admin = new AdminJS({
//     resources: [
//       {
//         resource: db.table("users"),
//         options: {},
//       },
//     ],
//   });

//   admin.watch();
//   router = Plugin.buildRouter(admin);

// //   var ConnectSession = Connect(session);
// //   var sessionStore = new ConnectSession({
// //     conObject: {
// //       connectionString: "postgresql://paulprince:fg@localhost:5432/medicalidem",
// //       ssl: process.env.NODE_ENV === "production",
// //     },
// //     tableName: "session",
// //     createTableIfMissing: true,
// //   });

// //   adminRouter = AdminJSExpress.buildAuthenticatedRouter(
// //     admin,
// //     {
// //       authenticate,
// //       cookieName: "adminjs",
// //       cookiePassword: "sessionsecret",
// //     },
// //     null,
// //     {
// //       store: sessionStore,
// //       resave: true,
// //       saveUninitialized: true,
// //       secret: "sessionsecret",
// //       cookie: {
// //         httpOnly: process.env.NODE_ENV === "production",
// //         secure: process.env.NODE_ENV === "production",
// //       },
// //       name: "adminjs",
// //     }
// //   );
// };

// start();

// module.exports = {
//   admin,
//   adminRouter,
//   router,
// };
