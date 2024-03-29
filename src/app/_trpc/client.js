import {
  createTRPCClient,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";

export const client = createTRPCClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});
