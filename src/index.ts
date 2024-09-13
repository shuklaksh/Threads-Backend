import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from './lib/db';


async function serverInit() {
    const PORT = 8080;
    const app = express();
    app.use(express.json());
    
    
    // GraphQL server
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query{
            hello: String
            say(name: String): String
        }
        type Mutation {
          createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
        }`,
        resolvers:{
            Query: {
                hello: () => `Hey there, I am a graphql server`,
                say: (_, { name }: { name: string }) => `Hey ${name}, How are you?`,
              },
            Mutation: {
                createUser: async (
                    _,
                    {
                      firstName,
                      lastName,
                      email,
                      password,
                    }: {
                      firstName: string;
                      lastName: string;
                      email: string;
                      password: string;
                    }
                  ) => {
                    await prismaClient.user.create({
                      data: {
                        email,
                        firstName,
                        lastName,
                        password,
                        salt: "random_salt",
                      },
                    });
                    return true;
                  },
            }

        },
      });
    
    //gqlServer start
    await gqlServer.start();
    app.use("/graphql",expressMiddleware(gqlServer))
    
    
    // express server
    app.get('/',(req,res) => {
        res.json({message: "server is up and running"});
    })
    
    app.listen(PORT, () => {console.log("server started")});
}

serverInit();

