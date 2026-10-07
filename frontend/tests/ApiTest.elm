module ApiTest exposing (suite)

import Api
import Expect
import Json.Decode as Decode exposing (Decoder)
import Test exposing (Test)
import Types exposing (Role(..), Session)


decodeOk : Decoder a -> String -> a -> Expect.Expectation
decodeOk decoder json expected =
    Decode.decodeString decoder json
        |> Expect.equal (Ok expected)


suite : Test
suite =
    Test.describe "Api decoders"
        [ Test.test "authDecoder reads an admin login payload" <|
            \_ ->
                decodeOk Api.authDecoder
                    """{"token":"t","user":{"id":4,"email":"admin@acme.test","name":"Store Admin","country":"US","role":"admin"}}"""
                    (Session "t" 4 "admin@acme.test" "Store Admin" AdminRole)
        , Test.test "authDecoder reads a customer login payload" <|
            \_ ->
                decodeOk Api.authDecoder
                    """{"token":"t","user":{"id":1,"email":"ada@example.com","name":"Ada Lovelace","country":"GB","role":"customer"}}"""
                    (Session "t" 1 "ada@example.com" "Ada Lovelace" CustomerRole)
        , Test.test "sessionDecoder reads a /auth/me payload" <|
            \_ ->
                decodeOk Api.sessionDecoder
                    """{"id":1,"email":"ada@example.com","name":"Ada Lovelace","country":"GB","role":"customer"}"""
                    (Session "" 1 "ada@example.com" "Ada Lovelace" CustomerRole)
        , Test.test "storedSessionDecoder reads a persisted session" <|
            \_ ->
                decodeOk Api.storedSessionDecoder
                    """{"token":"t","id":4,"email":"admin@acme.test","name":"Store Admin","role":"admin"}"""
                    (Session "t" 4 "admin@acme.test" "Store Admin" AdminRole)
        , Test.test "encodeSession round-trips through storedSessionDecoder" <|
            \_ ->
                let
                    session =
                        Session "t" 4 "admin@acme.test" "Store Admin" AdminRole
                in
                Decode.decodeString Api.storedSessionDecoder (Api.encodeSession session)
                    |> Expect.equal (Ok session)
        , Test.test "authDecoder rejects a non-string role" <|
            \_ ->
                Decode.decodeString Api.authDecoder
                    """{"token":"t","user":{"id":4,"email":"a@b.com","name":"N","country":"US","role":9}}"""
                    |> Expect.err
        , Test.test "productDecoder defaults missing optional fields" <|
            \_ ->
                decodeOk Api.productDecoder
                    """{"sku":"COF-ETH-1KG","name":"Ethiopia Yirgacheffe 1kg","category":"coffee","price_cents":2499,"stock":42}"""
                    { sku = "COF-ETH-1KG", name = "Ethiopia Yirgacheffe 1kg", category = "coffee", priceCents = 2499, stock = 42, reorderLevel = 0, active = 1, image = "", description = "" }
        , Test.test "productDecoder reads the description" <|
            \_ ->
                decodeOk Api.productDecoder
                    """{"sku":"A","name":"Alpha","category":"tea","price_cents":100,"stock":1,"description":"Tastes great"}"""
                    { sku = "A", name = "Alpha", category = "tea", priceCents = 100, stock = 1, reorderLevel = 0, active = 1, image = "", description = "Tastes great" }
        , Test.test "customerDecoder maps the role" <|
            \_ ->
                decodeOk Api.customerDecoder
                    """{"customer_id":4,"email":"admin@acme.test","full_name":"Store Admin","country":"US","role":"admin","created_at":"2026-01-01 00:00:00"}"""
                    { id = 4, email = "admin@acme.test", fullName = "Store Admin", country = "US", role = AdminRole, createdAt = "2026-01-01 00:00:00" }
        , Test.test "orderDecoder reads an order with items" <|
            \_ ->
                decodeOk Api.orderDecoder
                    """{"order_id":5,"customer_id":1,"customer_email":"ada@example.com","customer_name":"Ada Lovelace","status":"pending","placed_at":"2026-01-01 00:00:00","total_cents":6597,"items":[{"sku":"COF-ETH-1KG","name":"Ethiopia Yirgacheffe 1kg","quantity":2,"unit_price_cents":2499}]}"""
                    { id = 5, customerId = 1, customerEmail = "ada@example.com", customerName = "Ada Lovelace", status = "pending", placedAt = "2026-01-01 00:00:00", totalCents = 6597, items = [ { sku = "COF-ETH-1KG", name = "Ethiopia Yirgacheffe 1kg", quantity = 2, unitPriceCents = 2499 } ] }
        , Test.test "revenueDecoder reads a revenue row" <|
            \_ ->
                decodeOk Api.revenueDecoder
                    """{"category":"coffee","orders":3,"units":5,"revenue_cents":12195}"""
                    { category = "coffee", orders = 3, units = 5, revenueCents = 12195 }
        , Test.test "stockDecoder reads a low-stock row" <|
            \_ ->
                decodeOk Api.stockDecoder
                    """{"sku":"ACC-GRD-01","name":"Burr Grinder","stock":3,"reorder_level":5}"""
                    { sku = "ACC-GRD-01", name = "Burr Grinder", stock = 3, reorderLevel = 5 }
        , Test.test "pageDecoder reads a paged product list" <|
            \_ ->
                decodeOk (Api.pageDecoder Api.productDecoder)
                    """{"data":[{"sku":"A","name":"Alpha","category":"tea","price_cents":100,"stock":1}],"offset":0,"page_size":20,"total":1}"""
                    { items = [ { sku = "A", name = "Alpha", category = "tea", priceCents = 100, stock = 1, reorderLevel = 0, active = 1, image = "", description = "" } ], offset = 0, pageSize = 20, total = 1 }
        , Test.test "cartDecoder reads a stored cart" <|
            \_ ->
                decodeOk Api.cartDecoder
                    """[{"sku":"SKU1","name":"Beans","price_cents":1000,"quantity":2}]"""
                    [ { sku = "SKU1", name = "Beans", priceCents = 1000, quantity = 2 } ]
        , Test.test "encodeCart round-trips through cartDecoder" <|
            \_ ->
                let
                    cart =
                        [ { sku = "SKU1", name = "Beans", priceCents = 1000, quantity = 2 } ]
                in
                Decode.decodeString Api.cartDecoder (Api.encodeCart cart)
                    |> Expect.equal (Ok cart)
        , Test.test "signupReportDecoder reads the new-users report" <|
            \_ ->
                decodeOk Api.signupReportDecoder
                    """{"today":1,"last_7_days":2,"last_30_days":3,"last_90_days":4}"""
                    { today = 1, last7Days = 2, last30Days = 3, last90Days = 4 }
        , Test.test "uploadDecoder reads the uploaded image name" <|
            \_ ->
                decodeOk Api.uploadDecoder """{"image":"abc.png"}""" "abc.png"
        ]
