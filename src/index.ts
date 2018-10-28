import express from "express";
import graphqlHttp from "express-graphql";
import schema from "./schema";

const app = express();

const port = 3000;

const root = {
  hello: () => {
    return "Hello world";
  },
};

app.use(
  "/graphiql",
  graphqlHttp({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(3000, () => {
  // tslint:disable-next-line
  console.log(`App started on ${port}`);
});
