import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { createGraphQLServer } from './graphql';


async function serverInit() {
    const PORT = 8080;
    const app = express();
    app.use(express.json());
    
    
    // GraphQL server
    const gqlserver = await createGraphQLServer();
    app.use("/graphql",expressMiddleware(gqlserver));
    
    
    // express server
    app.get('/',(req,res) => {
        res.json({message: "server is up and running"});
    })
    
    app.listen(PORT, () => {console.log("server started")});
}

serverInit();

