import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from "graphql";

interface queryArgs {
  ingredients: Array<String>;
}

const recipeType = new GraphQLList(
  new GraphQLObjectType({
    name: "recipe",
    fields: () => ({
      title: { type: GraphQLString },
      href: { type: GraphQLString },
      ingredients: { type: GraphQLString },
      thumbnail: { type: GraphQLString }
    })
  })
);

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    recipes: {
      type: recipeType,
      args: {
        ingredients: { type: GraphQLList(GraphQLString) }
      },
      resolve: (_, { ingredients }: queryArgs) => [
        {
          title: "Hi",
          href: "Hello",
          ingredients: ingredients.join(","),
          thumbnail: "asjk"
        }
      ]
    }
  })
});

const schema = new GraphQLSchema({ query: queryType });

export default schema;
