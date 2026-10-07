module MainTest exposing (suite)

import Api
import Expect
import Http
import Main exposing (DeleteRequest(..), Msg(..))
import ProgramTest exposing (ProgramTest)
import Set
import Test exposing (Test)
import Test.Html.Event as Event
import Test.Html.Query as Query
import Test.Html.Selector as Selector
import Test.Html.Selector exposing (text)
import Time
import Types exposing (Customer, Order, Product, Remote(..), Role(..), Session, Tab(..))


start : ProgramTest Main.Model Main.Msg (Cmd Main.Msg)
start =
    ProgramTest.createElement
        { init = Main.init
        , update = Main.update
        , view = Main.view
        }
        |> ProgramTest.start { session = Nothing, cart = Nothing }


initModel : Main.Model
initModel =
    Tuple.first (Main.init { session = Nothing, cart = Nothing })


run : List Msg -> Main.Model -> Main.Model
run msgs model =
    List.foldl (\msg acc -> Tuple.first (Main.update msg acc)) model msgs


adminSession : Session
adminSession =
    { token = "test-token", id = 4, email = "admin@acme.test", name = "Store Admin", role = AdminRole }


customerSession : Session
customerSession =
    { token = "test-token", id = 1, email = "ada@example.com", name = "Ada Lovelace", role = CustomerRole }


sampleProduct : Product
sampleProduct =
    { sku = "SKU1", name = "Beans", category = "coffee", priceCents = 1000, stock = 5, reorderLevel = 2, active = 1, image = "", description = "Roasted daily" }


sampleOrder : Order
sampleOrder =
    { id = 1, customerId = 1, customerEmail = "a@b.com", customerName = "A", status = "pending", placedAt = "now", totalCents = 1000, items = [] }


sampleCustomer : Customer
sampleCustomer =
    { id = 1, email = "a@b.com", fullName = "A B", country = "US", role = CustomerRole, createdAt = "" }


suite : Test
suite =
    Test.describe "Main"
        [ Test.describe "view"
            [ Test.test "renders the sign-in form with the seeded credentials" <|
                \_ ->
                    start
                        |> ProgramTest.expectViewHas
                            [ text "Kafejo"
                            , text "Sign in"
                            , text "admin@acme.test"
                            , text "admin123"
                            , text "ada@example.com"
                            , text "customer123"
                            ]
            , Test.test "an admin session shows the admin tabs" <|
                \_ ->
                    start
                        |> ProgramTest.update (GotAuth (Ok adminSession))
                        |> ProgramTest.expectViewHas
                            [ text "Store Admin · admin"
                            , text "Products"
                            , text "Customers"
                            , text "Reports"
                            ]
            , Test.test "an admin session has no Catalog tab" <|
                \_ ->
                    start
                        |> ProgramTest.update (GotAuth (Ok adminSession))
                        |> ProgramTest.expectViewHasNot [ text "Catalog" ]
            , Test.test "a customer session shows Catalog, My Orders and the cart" <|
                \_ ->
                    start
                        |> ProgramTest.update (GotAuth (Ok customerSession))
                        |> ProgramTest.expectViewHas
                            [ text "Ada Lovelace · customer"
                            , text "Catalog"
                            , text "My Orders"
                            , text "Your cart"
                            ]
            , Test.test "a guest product modal prompts to sign in" <|
                \_ ->
                    start
                        |> ProgramTest.update (GotProduct (Ok sampleProduct))
                        |> ProgramTest.expectViewHas [ text "Sign in or register to add to cart." ]
            , Test.test "a customer product modal offers Add to cart" <|
                \_ ->
                    start
                        |> ProgramTest.update (GotAuth (Ok customerSession))
                        |> ProgramTest.update (GotProduct (Ok sampleProduct))
                        |> ProgramTest.expectViewHas [ text "Add to cart" ]
            , Test.test "the product modal shows the description" <|
                \_ ->
                    start
                        |> ProgramTest.update (GotProduct (Ok sampleProduct))
                        |> ProgramTest.expectViewHas [ text "Roasted daily" ]
            ]
        , Test.describe "auth"
            [ Test.test "submitting with empty fields surfaces an error" <|
                \_ ->
                    run [ SubmitAuth ] initModel
                        |> .authError
                        |> Expect.equal (Just "Email and password are required.")
            , Test.test "a failed sign-in surfaces the HTTP error" <|
                \_ ->
                    run [ SetAuthEmail "a@b.com", SetAuthPassword "x", GotAuth (Err (Http.BadStatus 401)) ] initModel
                        |> .authError
                        |> Expect.equal (Just "Server returned HTTP 401.")
            , Test.test "an admin session selects the admin products tab" <|
                \_ ->
                    run [ GotAuth (Ok adminSession) ] initModel
                        |> .tab
                        |> Expect.equal AdminProducts
            , Test.test "a customer session stays on the catalog" <|
                \_ ->
                    run [ GotAuth (Ok customerSession) ] initModel
                        |> .tab
                        |> Expect.equal Catalog
            , Test.test "signing out clears the session" <|
                \_ ->
                    run [ GotAuth (Ok adminSession), SignOut ] initModel
                        |> .session
                        |> Expect.equal Nothing
            , Test.test "a stored session is restored on init" <|
                \_ ->
                    let
                        ( model, _ ) =
                            Main.init { session = Just (Api.encodeSession adminSession), cart = Nothing }
                    in
                    Expect.all
                        [ \m -> m.session |> Expect.equal (Just adminSession)
                        , \m -> m.tab |> Expect.equal AdminProducts
                        ]
                        model
            , Test.test "an invalid stored session is ignored" <|
                \_ ->
                    Tuple.first (Main.init { session = Just "not-json", cart = Nothing })
                        |> .session
                        |> Expect.equal Nothing
            , Test.test "session validation replaces a tampered role with the server role" <|
                \_ ->
                    let
                        serverUser =
                            { token = "", id = 1, email = "ada@example.com", name = "Ada Lovelace", role = CustomerRole }

                        next =
                            run [ GotAuth (Ok adminSession), GotSessionValidated (Ok serverUser) ] initModel
                    in
                    Expect.all
                        [ \m -> m.session |> Maybe.map .role |> Expect.equal (Just CustomerRole)
                        , \m -> m.tab |> Expect.equal Catalog
                        ]
                        next
            , Test.test "session validation failure signs the user out" <|
                \_ ->
                    run [ GotAuth (Ok adminSession), GotSessionValidated (Err (Http.BadStatus 401)) ] initModel
                        |> .session
                        |> Expect.equal Nothing
            ]
        , Test.describe "cart"
            [ Test.test "adding a product creates a cart line" <|
                \_ ->
                    run [ AddToCart sampleProduct ] initModel
                        |> .cart
                        |> Expect.equal [ { sku = "SKU1", name = "Beans", priceCents = 1000, quantity = 1 } ]
            , Test.test "adding the same product merges quantities" <|
                \_ ->
                    run [ AddToCart sampleProduct, AddToCart sampleProduct ] initModel
                        |> .cart
                        |> Expect.equal [ { sku = "SKU1", name = "Beans", priceCents = 1000, quantity = 2 } ]
            , Test.test "adding an item sets the cart notice" <|
                \_ ->
                    run [ AddToCart sampleProduct ] initModel
                        |> .orderNotice
                        |> Expect.equal (Just "Added item to cart")
            , Test.test "adding after a placed order replaces the notice" <|
                \_ ->
                    run
                        [ GotAuth (Ok customerSession)
                        , AddToCart sampleProduct
                        , GotOrder (Ok sampleOrder)
                        , AddToCart sampleProduct
                        ]
                        initModel
                        |> .orderNotice
                        |> Expect.equal (Just "Added item to cart")
            , Test.test "removing a product empties the cart" <|
                \_ ->
                    run [ AddToCart sampleProduct, RemoveCart "SKU1" ] initModel
                        |> .cart
                        |> Expect.equal []
            , Test.test "a successful order clears the cart and shows a notice" <|
                \_ ->
                    let
                        next =
                            run [ GotAuth (Ok customerSession), AddToCart sampleProduct, GotOrder (Ok sampleOrder) ] initModel
                    in
                    Expect.all
                        [ \m -> m.cart |> Expect.equal []
                        , \m -> m.orderNotice |> Expect.equal (Just "Order placed!")
                        ]
                        next
            , Test.test "a placed order opens the My Orders tab" <|
                \_ ->
                    run [ GotAuth (Ok customerSession), AddToCart sampleProduct, GotOrder (Ok sampleOrder) ] initModel
                        |> .tab
                        |> Expect.equal MyOrders
            , Test.test "ReceiveCart restores a stored cart" <|
                \_ ->
                    run
                        [ GotAuth (Ok customerSession)
                        , ReceiveCart (Just "[{\"sku\":\"SKU1\",\"name\":\"Beans\",\"price_cents\":1000,\"quantity\":2}]")
                        ]
                        initModel
                        |> .cart
                        |> Expect.equal [ { sku = "SKU1", name = "Beans", priceCents = 1000, quantity = 2 } ]
            , Test.test "ReceiveCart with invalid JSON empties the cart" <|
                \_ ->
                    run [ GotAuth (Ok customerSession), AddToCart sampleProduct, ReceiveCart (Just "nope") ] initModel
                        |> .cart
                        |> Expect.equal []
            , Test.test "a cart from flags is restored on init" <|
                \_ ->
                    let
                        ( model, _ ) =
                            Main.init
                                { session = Just (Api.encodeSession customerSession)
                                , cart = Just "[{\"sku\":\"SKU1\",\"name\":\"Beans\",\"price_cents\":1000,\"quantity\":3}]"
                                }
                    in
                    model.cart
                        |> Expect.equal [ { sku = "SKU1", name = "Beans", priceCents = 1000, quantity = 3 } ]
            ]
        , Test.describe "admin product editor"
            [ Test.test "NewProduct opens an empty draft" <|
                \_ ->
                    run [ NewProduct ] initModel
                        |> .productDraft
                        |> Maybe.map .isNew
                        |> Expect.equal (Just True)
            , Test.test "EditProduct fills the draft from the product" <|
                \_ ->
                    run [ EditProduct sampleProduct ] initModel
                        |> .productDraft
                        |> Maybe.map .sku
                        |> Expect.equal (Just "SKU1")
            , Test.test "EditProduct fills the draft description" <|
                \_ ->
                    run [ EditProduct sampleProduct ] initModel
                        |> .productDraft
                        |> Maybe.map .description
                        |> Expect.equal (Just "Roasted daily")
            , Test.test "SetProductField updates the draft description" <|
                \_ ->
                    run [ EditProduct sampleProduct, SetProductField "description" "New text" ] initModel
                        |> .productDraft
                        |> Maybe.map .description
                        |> Expect.equal (Just "New text")
            , Test.test "SetProductActive toggles the draft" <|
                \_ ->
                    run [ EditProduct sampleProduct, SetProductActive False ] initModel
                        |> .productDraft
                        |> Maybe.map .active
                        |> Expect.equal (Just False)
            , Test.test "clicking the Active control toggles the draft" <|
                \_ ->
                    start
                        |> ProgramTest.update (EditProduct sampleProduct)
                        |> ProgramTest.simulateDomEvent
                            (Query.find [ Selector.class "checkbox-row" ])
                            Event.click
                        |> ProgramTest.expectModel
                            (\m -> m.productDraft |> Maybe.map .active |> Expect.equal (Just False))
            , Test.test "GotUploadedImage replaces the draft image" <|
                \_ ->
                    run [ NewProduct, GotUploadedImage (Ok "abc.png") ] initModel
                        |> .productDraft
                        |> Maybe.map .image
                        |> Expect.equal (Just "abc.png")
            , Test.test "a draft with no name is rejected" <|
                \_ ->
                    run [ EditProduct sampleProduct, SetProductField "name" "", SubmitProduct ] initModel
                        |> .productError
                        |> Expect.equal (Just "Name and category are required.")
            , Test.test "a non-numeric price is rejected" <|
                \_ ->
                    run [ EditProduct sampleProduct, SetProductField "price" "abc", SubmitProduct ] initModel
                        |> .productError
                        |> Expect.equal (Just "Price, stock and reorder level must be whole numbers.")
            ]
        , Test.describe "admin data"
            [ Test.test "products load into state" <|
                \_ ->
                    run [ GotAdminProducts (Ok [ sampleProduct ]) ] initModel
                        |> .adminProducts
                        |> Expect.equal (Success [ sampleProduct ])
            , Test.test "EditCustomer opens the customer draft" <|
                \_ ->
                    run [ GotAuth (Ok adminSession), EditCustomer sampleCustomer ] initModel
                        |> .customerDraft
                        |> Maybe.map .role
                        |> Expect.equal (Just CustomerRole)
            , Test.test "the new-users report loads into state" <|
                \_ ->
                    run [ GotSignups (Ok { today = 1, last7Days = 2, last30Days = 3, last90Days = 4 }) ] initModel
                        |> .signups
                        |> Expect.equal (Success { today = 1, last7Days = 2, last30Days = 3, last90Days = 4 })
            ]
        , Test.describe "delete confirmation"
            [ Test.test "requesting a product delete opens the confirm dialog" <|
                \_ ->
                    run [ RequestDeleteProduct sampleProduct ] initModel
                        |> .deleteRequest
                        |> Expect.equal (Just (DeleteProductRequest sampleProduct))
            , Test.test "requesting a customer delete opens the confirm dialog" <|
                \_ ->
                    run [ RequestDeleteCustomer sampleCustomer ] initModel
                        |> .deleteRequest
                        |> Expect.equal (Just (DeleteCustomerRequest sampleCustomer))
            , Test.test "cancelling clears the pending delete" <|
                \_ ->
                    run [ RequestDeleteProduct sampleProduct, CancelDelete ] initModel
                        |> .deleteRequest
                        |> Expect.equal Nothing
            , Test.test "confirming clears the pending delete" <|
                \_ ->
                    run [ RequestDeleteProduct sampleProduct, ConfirmDelete ] initModel
                        |> .deleteRequest
                        |> Expect.equal Nothing
            , Test.test "the confirm dialog renders for a pending delete" <|
                \_ ->
                    start
                        |> ProgramTest.update (GotAuth (Ok adminSession))
                        |> ProgramTest.update (RequestDeleteProduct sampleProduct)
                        |> ProgramTest.expectViewHas [ text "Confirm delete" ]
            ]
        , Test.describe "order time toggle"
            [ Test.test "TimeTick updates the current time" <|
                \_ ->
                    run [ TimeTick (Time.millisToPosix 12345) ] initModel
                        |> .now
                        |> Expect.equal (Time.millisToPosix 12345)
            , Test.test "tapping an order timestamp expands it" <|
                \_ ->
                    run [ ToggleOrderTime 1 ] initModel
                        |> .expandedTimes
                        |> Set.member 1
                        |> Expect.equal True
            , Test.test "tapping again collapses it" <|
                \_ ->
                    run [ ToggleOrderTime 1, ToggleOrderTime 1 ] initModel
                        |> .expandedTimes
                        |> Set.member 1
                        |> Expect.equal False
            ]
        , Test.describe "modals"
            [ Test.test "CloseProduct clears the selected product" <|
                \_ ->
                    run [ GotProduct (Ok sampleProduct), CloseProduct ] initModel
                        |> .selected
                        |> Expect.equal Nothing
            ]
        ]
