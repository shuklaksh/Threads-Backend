import { prismaClient } from "../../lib/db";

export const mutations = {

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
    }   
}