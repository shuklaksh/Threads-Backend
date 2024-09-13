import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import { Users } from "./users";

export async function createGraphQLServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                ${Users.queries}
            }
            type Mutation {
                ${Users.mutations}
            }
       `,
        resolvers:{
            Query: {
                ...Users.resolvers.queries
            },
            Mutation: {
                ...Users.resolvers.mutations
            }
        },
      });
    
    //gqlServer start
    await gqlServer.start();

    return gqlServer;
}