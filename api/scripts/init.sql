-- Acme Coffee Store: schema + seed data (idempotent)
DROP TABLE IF EXISTS ORDER_ITEMS;
DROP TABLE IF EXISTS ORDERS;
DROP TABLE IF EXISTS PRODUCTS;
DROP TABLE IF EXISTS CUSTOMERS;

CREATE TABLE CUSTOMERS (
  CUSTOMER_ID   INTEGER PRIMARY KEY AUTOINCREMENT,
  EMAIL         TEXT NOT NULL UNIQUE,
  FULL_NAME     TEXT NOT NULL,
  COUNTRY       TEXT NOT NULL DEFAULT 'US',
  PASSWORD_HASH TEXT NOT NULL DEFAULT '',
  ROLE          TEXT NOT NULL DEFAULT 'customer' CHECK (ROLE IN ('customer','admin')),
  CREATED_AT    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE PRODUCTS (
  SKU           TEXT PRIMARY KEY,
  NAME          TEXT NOT NULL,
  CATEGORY      TEXT NOT NULL,
  PRICE_CENTS   INTEGER NOT NULL CHECK (PRICE_CENTS >= 0),
  STOCK         INTEGER NOT NULL DEFAULT 0,
  REORDER_LEVEL INTEGER NOT NULL DEFAULT 10,
  ACTIVE        INTEGER NOT NULL DEFAULT 1,
  IMAGE         TEXT NOT NULL DEFAULT '',
  DESCRIPTION   TEXT NOT NULL DEFAULT ''
);

CREATE TABLE ORDERS (
  ORDER_ID    INTEGER PRIMARY KEY AUTOINCREMENT,
  CUSTOMER_ID INTEGER NOT NULL REFERENCES CUSTOMERS(CUSTOMER_ID),
  STATUS      TEXT NOT NULL DEFAULT 'pending'
              CHECK (STATUS IN ('pending','paid','shipped','cancelled')),
  PLACED_AT   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE ORDER_ITEMS (
  ORDER_ITEM_ID    INTEGER PRIMARY KEY AUTOINCREMENT,
  ORDER_ID         INTEGER NOT NULL REFERENCES ORDERS(ORDER_ID),
  SKU              TEXT NOT NULL REFERENCES PRODUCTS(SKU),
  QUANTITY         INTEGER NOT NULL CHECK (QUANTITY > 0),
  UNIT_PRICE_CENTS INTEGER NOT NULL
);

CREATE INDEX IDX_ORDER_ITEMS_ORDER ON ORDER_ITEMS(ORDER_ID);
CREATE INDEX IDX_ORDERS_CUSTOMER ON ORDERS(CUSTOMER_ID);
CREATE INDEX IDX_PRODUCTS_CATEGORY ON PRODUCTS(CATEGORY);

INSERT INTO CUSTOMERS (EMAIL, FULL_NAME, COUNTRY, PASSWORD_HASH, ROLE) VALUES
 ('ada@example.com',   'Ada Lovelace',  'GB', '$2a$10$HrQi0B/0LL//r9kFLAaflevVk8yGtNXLl3ixnCleF9DJHlmKIGhi2', 'customer'),
 ('linus@example.com', 'Linus Torvalds','FI', '$2a$10$HrQi0B/0LL//r9kFLAaflevVk8yGtNXLl3ixnCleF9DJHlmKIGhi2', 'customer'),
 ('grace@example.com', 'Grace Hopper',  'US', '$2a$10$HrQi0B/0LL//r9kFLAaflevVk8yGtNXLl3ixnCleF9DJHlmKIGhi2', 'customer'),
 ('admin@acme.test',   'Store Admin',   'US', '$2a$10$T8knP8s5XRvqQ2hjdC/Lz.iZjhZNLjGo78HVyLneyio7bHFpu0ttq', 'admin');

INSERT INTO PRODUCTS (SKU, NAME, CATEGORY, PRICE_CENTS, STOCK, REORDER_LEVEL, ACTIVE, IMAGE, DESCRIPTION) VALUES
 ('COF-ETH-1KG', 'Ethiopia Yirgacheffe 1kg', 'coffee',    2499, 42, 10, 0, 'cof-eth-1kg.svg', 'Floral and citrus-forward washed coffee from Yirgacheffe.'),
 ('COF-COL-1KG', 'Colombia Huila 1kg',       'coffee',    2199,  7, 10, 1, 'cof-col-1kg.svg', 'Balanced single-origin with caramel sweetness and a nutty finish.'),
 ('TEA-ASS-500', 'Assam Black Tea 500g',     'tea',       1299, 25,  8, 1, 'tea-ass-500.svg', 'Bold malty black tea from the Assam valley.'),
 ('ACC-GRD-01',  'Burr Grinder',             'accessory', 8999,  3,  5, 1, 'acc-grd-01.svg', 'Hand grinder with conical burrs for an even grind.'),
 ('ACC-MUG-01',  'Ceramic Mug',              'accessory', 1599, 120, 20, 1, 'acc-mug-01.svg', 'Stoneware mug with a matte glaze, holds 12 oz.');

INSERT INTO ORDERS (CUSTOMER_ID, STATUS, PLACED_AT) VALUES
 (1, 'paid',      '2026-09-01 10:00:00'),
 (1, 'shipped',   '2026-09-03 12:30:00'),
 (2, 'pending',   '2026-09-04 09:15:00'),
 (3, 'cancelled', '2026-09-05 16:45:00');

INSERT INTO ORDER_ITEMS (ORDER_ID, SKU, QUANTITY, UNIT_PRICE_CENTS) VALUES
 (1, 'COF-ETH-1KG', 2, 2499),
 (1, 'ACC-MUG-01',  1, 1599),
 (2, 'TEA-ASS-500', 3, 1299),
 (3, 'ACC-GRD-01',  1, 8999),
 (4, 'COF-COL-1KG', 1, 2199);

-- @label: seeded
SELECT 'ok' AS STATUS;
