import { z } from "zod";
import usersData from "dummyData/users.json";
import CategoriesData from "dummyData/categories.json";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
  createCallerFactory,
} from "~/server/api/trpc";

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
      let isLoginCredCorrect = false;
      usersData.some((obj) => {
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
  categoriesData: privateProcedure.query(() => {
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
