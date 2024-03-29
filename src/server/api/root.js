import {
  createCallerFactory,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "./trpc";
import { z } from "zod";
import dummyData from "dummyData/users";
import CategoriesData from "dummyData/categories.json";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30];
  }),
  dedoTodos: publicProcedure.mutation(async () => {
    return [10, 20, 30];
  }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .query(({ input }) => {
      console.log("dummyData", dummyData);
      let isLoginCredCorrect = false;
      dummyData.some((obj) => {
        if (obj.email === input.email && obj.password === input.password) {
          isLoginCredCorrect = true;
          return true;
        }
      });

      return {
        check: isLoginCredCorrect,
        email: input.email,
        password: input.password,
      };
    }),
  secretData: privateProcedure.query(() => {
    return CategoriesData;
  }),
  emailCheck: publicProcedure
    .input(
      z.object({
        email: z.string(),
        code: z.string(),
      })
    )
    .query(({ input }) => {
      if (input.code === "12345678") {
        return {
          check: true,
        };
      } else {
        return {
          check: false,
        };
      }
    }),
});

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
