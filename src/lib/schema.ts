import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

/* ---------------- Products Table ---------------- */
export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),                // auto increment
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ---------------- Sales Table ---------------- */
export const salesTable = pgTable("sales", {
  id: serial("id").primaryKey(),                // auto increment
  productId: integer("product_id")
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).notNull(),
  saleDate: timestamp("sale_date").defaultNow(),
  customerName: text("customer_name").notNull(),
  region: text("region").notNull(),
});
