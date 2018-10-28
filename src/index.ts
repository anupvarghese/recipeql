import express from "express";
import graphqlHttp from "express-graphql";
import schema from "./schema";

const app = express();

const port = 3000;

app.use(
  "/graphiql",
  graphqlHttp({
    graphiql: true,
    schema
  })
);

app.listen(3000, () => {
  // tslint:disable-next-line
  console.log(`App started on ${port}`);
});
