import axios from "axios";
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql";
import qs from "querystring";

interface IQueryArgs {
  ingredients: string[];
  dish: string;
  page: number;
}

interface IRecipeResponse {
  results: [
    {
      title: string;
      href: string;
      ingredients: string[];
      thumbnail: string;
    }
  ];
}

const recipeType = new GraphQLList(
  new GraphQLObjectType({
    fields: () => ({
      href: { type: GraphQLString },
      ingredients: { type: GraphQLString },
      thumbnail: { type: GraphQLString },
      title: { type: GraphQLString }
    }),
    name: "recipe",
  })
);

const queryType = new GraphQLObjectType({
  fields: () => ({
    name: "Query",
    recipes: {
      args: {
        dish: { type: GraphQLString },
        ingredients: { type: GraphQLList(GraphQLString) },
      },
      resolve: (_, { ingredients, dish, page = 1 }: IQueryArgs) => {
        const query = qs.stringify({
          i: ingredients.join(","),
          p: page,
          q: dish,
        });
        const url = `http://www.recipepuppy.com/api?${query}`;
        return axios.get<IRecipeResponse>(url).then(res => {
          return res.data.results;
        });
      },
      type: recipeType,
    },
  })
});

const schema = new GraphQLSchema({ query: queryType });

export default schema;
