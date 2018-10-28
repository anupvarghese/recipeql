import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from "graphql";
import axios from "axios";
import qs from "querystring";

interface queryArgs {
  ingredients: Array<String>;
  dish: String;
  page: Number;
}

interface RecipeResponse {
  results: [
    {
      title: String;
      href: String;
      ingredients: Array<String>;
      thumbnail: String;
    }
  ];
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
        ingredients: { type: GraphQLList(GraphQLString) },
        dish: { type: GraphQLString }
      },
      resolve: async (_, { ingredients, dish, page = 1 }: queryArgs) => {
        const query = qs.stringify({
          i: ingredients.join(","),
          q: dish,
          p: page
        });
        const url = `http://www.recipepuppy.com/api?${query}`;
        return axios.get<RecipeResponse>(url).then(res => {
          return res.data.results;
        });
      }
    }
  })
});

const schema = new GraphQLSchema({ query: queryType });

export default schema;
