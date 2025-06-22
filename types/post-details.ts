import { posts } from "@/schemas/schema";
import { InferModel } from "drizzle-orm";

export type PostDetails = InferModel<typeof posts>;
