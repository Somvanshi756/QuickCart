import { serve } from "inngest/next";
import { inngest, syncUsercreation,  syncUserDelete,  syncUserUpdate,   } from "@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
      syncUsercreation,
      syncUserUpdate,
      syncUserDelete
    ],
});
