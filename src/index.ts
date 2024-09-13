import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';


async function serverInit() {
    const PORT = 8080;
    const app = express();
    app.use(express.json());
    
    
    // GraphQL server
    const gqlServer = new ApolloServer({
        typeDefs: ``,
        resolvers:{},
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

