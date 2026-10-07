module Api exposing
    ( CustomerInput
    , OrderLine
    , ProductInput
    , adminCustomers
    , adminOrders
    , adminProducts
    , authDecoder
    , cartDecoder
    , createProduct
    , customerDecoder
    , deleteCustomer
    , deleteProduct
    , encodeCart
    , encodeSession
    , getProduct
    , login
    , lowStock
    , me
    , myOrders
    , orderDecoder
    , pageDecoder
    , placeOrder
    , productDecoder
    , products
    , queryString
    , register
    , revenue
    , revenueDecoder
    , sessionDecoder
    , signupReportDecoder
    , signups
    , stockDecoder
    , storedSessionDecoder
    , updateCustomer
    , updateOrderStatus
    , updateProduct
    , uploadDecoder
    , uploadImage
    )

import File
import Http
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Types exposing (CartItem, Customer, Order, Page, Product, RevenueRow, Role(..), Session, SignupReport, StockRow)
import Url


baseUrl : String
baseUrl =
    ""


type alias ProductInput =
    { sku : String
    , name : String
    , category : String
    , priceCents : Int
    , stock : Int
    , reorderLevel : Int
    , active : Bool
    , image : String
    , description : String
    }


type alias CustomerInput =
    { fullName : String
    , country : String
    , role : Role
    }


type alias OrderLine =
    { sku : String
    , quantity : Int
    }


authHeader : String -> List Http.Header
authHeader token =
    [ Http.header "Authorization" ("Bearer " ++ token) ]


request : String -> String -> List Http.Header -> Maybe Encode.Value -> Decoder a -> (Result Http.Error a -> msg) -> Cmd msg
request method path headers payload decoder toMsg =
    Http.request
        { method = method
        , headers = headers
        , url = baseUrl ++ path
        , body =
            case payload of
                Just value ->
                    Http.jsonBody value

                Nothing ->
                    Http.emptyBody
        , expect = Http.expectJson toMsg decoder
        , timeout = Just 10000
        , tracker = Nothing
        }


queryString : List ( String, String ) -> String
queryString params =
    case params of
        [] ->
            ""

        _ ->
            "?" ++ String.join "&" (List.map (\( k, v ) -> Url.percentEncode k ++ "=" ++ Url.percentEncode v) params)


withDefault : a -> Decoder a -> Decoder a
withDefault fallback decoder =
    Decode.oneOf [ decoder, Decode.succeed fallback ]


roleDecoder : Decoder Role
roleDecoder =
    Decode.string
        |> Decode.map
            (\value ->
                if value == "admin" then
                    AdminRole

                else
                    CustomerRole
            )


roleEncode : Role -> String
roleEncode role =
    case role of
        AdminRole ->
            "admin"

        CustomerRole ->
            "customer"


sessionDecoder : Decoder Session
sessionDecoder =
    Decode.map4 (\id email name role -> Session "" id email name role)
        (Decode.field "id" Decode.int)
        (Decode.field "email" Decode.string)
        (Decode.field "name" Decode.string)
        (Decode.field "role" roleDecoder)


authDecoder : Decoder Session
authDecoder =
    Decode.map2 (\token user -> { user | token = token })
        (Decode.field "token" Decode.string)
        (Decode.field "user" sessionDecoder)


storedSessionDecoder : Decoder Session
storedSessionDecoder =
    Decode.map5 Session
        (Decode.field "token" Decode.string)
        (Decode.field "id" Decode.int)
        (Decode.field "email" Decode.string)
        (Decode.field "name" Decode.string)
        (Decode.field "role" roleDecoder)


encodeSession : Session -> String
encodeSession session =
    Encode.encode 0
        (Encode.object
            [ ( "token", Encode.string session.token )
            , ( "id", Encode.int session.id )
            , ( "email", Encode.string session.email )
            , ( "name", Encode.string session.name )
            , ( "role", Encode.string (roleEncode session.role) )
            ]
        )


pageDecoder : Decoder a -> Decoder (Page a)
pageDecoder item =
    Decode.map4 Page
        (Decode.field "data" (Decode.list item))
        (Decode.field "offset" Decode.int)
        (Decode.field "page_size" Decode.int)
        (Decode.field "total" Decode.int)


productDecoder : Decoder Product
productDecoder =
    Decode.map2 (\build description -> build description)
        (Decode.map8 Product
            (Decode.field "sku" Decode.string)
            (Decode.field "name" Decode.string)
            (Decode.field "category" Decode.string)
            (Decode.field "price_cents" Decode.int)
            (Decode.field "stock" Decode.int)
            (Decode.field "reorder_level" Decode.int |> withDefault 0)
            (Decode.field "active" Decode.int |> withDefault 1)
            (Decode.field "image" Decode.string |> withDefault "")
        )
        (Decode.field "description" Decode.string |> withDefault "")


customerDecoder : Decoder Customer
customerDecoder =
    Decode.map6 Customer
        (Decode.field "customer_id" Decode.int)
        (Decode.field "email" Decode.string)
        (Decode.field "full_name" Decode.string)
        (Decode.field "country" Decode.string)
        (Decode.field "role" roleDecoder)
        (Decode.field "created_at" Decode.string |> withDefault "")


orderItemDecoder : Decoder Types.OrderItem
orderItemDecoder =
    Decode.map4 Types.OrderItem
        (Decode.field "sku" Decode.string)
        (Decode.field "name" Decode.string |> withDefault "")
        (Decode.field "quantity" Decode.int)
        (Decode.field "unit_price_cents" Decode.int)


orderDecoder : Decoder Order
orderDecoder =
    Decode.map8 Order
        (Decode.field "order_id" Decode.int)
        (Decode.field "customer_id" Decode.int)
        (Decode.field "customer_email" Decode.string |> withDefault "")
        (Decode.field "customer_name" Decode.string |> withDefault "")
        (Decode.field "status" Decode.string)
        (Decode.field "placed_at" Decode.string)
        (Decode.field "total_cents" Decode.int |> withDefault 0)
        (Decode.field "items" (Decode.list orderItemDecoder) |> withDefault [])


revenueDecoder : Decoder RevenueRow
revenueDecoder =
    Decode.map4 RevenueRow
        (Decode.field "category" Decode.string)
        (Decode.field "orders" Decode.int)
        (Decode.field "units" Decode.int)
        (Decode.field "revenue_cents" Decode.int)


signupReportDecoder : Decoder SignupReport
signupReportDecoder =
    Decode.map4 SignupReport
        (Decode.field "today" Decode.int)
        (Decode.field "last_7_days" Decode.int)
        (Decode.field "last_30_days" Decode.int)
        (Decode.field "last_90_days" Decode.int)


stockDecoder : Decoder StockRow
stockDecoder =
    Decode.map4 StockRow
        (Decode.field "sku" Decode.string)
        (Decode.field "name" Decode.string)
        (Decode.field "stock" Decode.int)
        (Decode.field "reorder_level" Decode.int)


cartDecoder : Decoder (List CartItem)
cartDecoder =
    Decode.list
        (Decode.map4 CartItem
            (Decode.field "sku" Decode.string)
            (Decode.field "name" Decode.string)
            (Decode.field "price_cents" Decode.int)
            (Decode.field "quantity" Decode.int)
        )


encodeCart : List CartItem -> String
encodeCart cart =
    Encode.encode 0
        (Encode.list
            (\item ->
                Encode.object
                    [ ( "sku", Encode.string item.sku )
                    , ( "name", Encode.string item.name )
                    , ( "price_cents", Encode.int item.priceCents )
                    , ( "quantity", Encode.int item.quantity )
                    ]
            )
            cart
        )


encodeProduct : ProductInput -> Encode.Value
encodeProduct product =
    Encode.object
        [ ( "sku", Encode.string product.sku )
        , ( "name", Encode.string product.name )
        , ( "category", Encode.string product.category )
        , ( "price_cents", Encode.int product.priceCents )
        , ( "stock", Encode.int product.stock )
        , ( "reorder_level", Encode.int product.reorderLevel )
        , ( "active", Encode.int (boolToInt product.active) )
        , ( "image", Encode.string product.image )
        , ( "description", Encode.string product.description )
        ]


boolToInt : Bool -> Int
boolToInt value =
    if value then
        1

    else
        0


encodeCustomer : CustomerInput -> Encode.Value
encodeCustomer customer =
    Encode.object
        [ ( "full_name", Encode.string customer.fullName )
        , ( "country", Encode.string customer.country )
        , ( "role", Encode.string (roleEncode customer.role) )
        ]


encodeCredentials : String -> String -> String -> Encode.Value
encodeCredentials email password name =
    Encode.object
        [ ( "email", Encode.string email )
        , ( "password", Encode.string password )
        , ( "full_name", Encode.string name )
        ]


encodeOrder : List OrderLine -> Encode.Value
encodeOrder lines =
    Encode.object
        [ ( "items"
          , Encode.list
                (\line ->
                    Encode.object
                        [ ( "sku", Encode.string line.sku )
                        , ( "quantity", Encode.int line.quantity )
                        ]
                )
                lines
          )
        ]


products : { pageSize : Int, offset : Int, category : Maybe String, orderBy : String } -> (Result Http.Error (Page Product) -> msg) -> Cmd msg
products opts toMsg =
    let
        params =
            [ ( ".page_size", String.fromInt opts.pageSize )
            , ( ".offset", String.fromInt opts.offset )
            , ( ".order_by", opts.orderBy )
            ]
                ++ (case opts.category of
                        Just category ->
                            [ ( "category", category ) ]

                        Nothing ->
                            []
                   )
    in
    request "GET" ("/store/products" ++ queryString params) [] Nothing (pageDecoder productDecoder) toMsg


getProduct : String -> (Result Http.Error Product -> msg) -> Cmd msg
getProduct sku toMsg =
    request "GET" ("/store/products/" ++ Url.percentEncode sku) [] Nothing productDecoder toMsg


lowStock : (Result Http.Error (List StockRow) -> msg) -> Cmd msg
lowStock toMsg =
    request "GET" "/store/low_stock" [] Nothing (Decode.list stockDecoder) toMsg


register : { email : String, password : String, name : String } -> (Result Http.Error Session -> msg) -> Cmd msg
register creds toMsg =
    request "POST" "/auth/register" [] (Just (encodeCredentials creds.email creds.password creds.name)) authDecoder toMsg


login : { email : String, password : String } -> (Result Http.Error Session -> msg) -> Cmd msg
login creds toMsg =
    request "POST" "/auth/login" [] (Just (encodeCredentials creds.email creds.password "")) authDecoder toMsg


me : String -> (Result Http.Error Session -> msg) -> Cmd msg
me token toMsg =
    request "GET" "/auth/me" (authHeader token) Nothing sessionDecoder toMsg


myOrders : String -> (Result Http.Error (List Order) -> msg) -> Cmd msg
myOrders token toMsg =
    request "GET" "/my/orders" (authHeader token) Nothing (Decode.list orderDecoder) toMsg


placeOrder : String -> List OrderLine -> (Result Http.Error Order -> msg) -> Cmd msg
placeOrder token lines toMsg =
    request "POST" "/my/orders" (authHeader token) (Just (encodeOrder lines)) orderDecoder toMsg


adminProducts : String -> (Result Http.Error (List Product) -> msg) -> Cmd msg
adminProducts token toMsg =
    request "GET" "/admin/products" (authHeader token) Nothing (Decode.list productDecoder) toMsg


createProduct : String -> ProductInput -> (Result Http.Error Product -> msg) -> Cmd msg
createProduct token product toMsg =
    request "POST" "/admin/products" (authHeader token) (Just (encodeProduct product)) productDecoder toMsg


updateProduct : String -> ProductInput -> (Result Http.Error Product -> msg) -> Cmd msg
updateProduct token product toMsg =
    request "PUT" ("/admin/products/" ++ Url.percentEncode product.sku) (authHeader token) (Just (encodeProduct product)) productDecoder toMsg


deleteProduct : String -> String -> (Result Http.Error String -> msg) -> Cmd msg
deleteProduct token sku toMsg =
    request "DELETE" ("/admin/products/" ++ Url.percentEncode sku) (authHeader token) Nothing (Decode.field "deleted" Decode.string) toMsg


adminOrders : String -> (Result Http.Error (List Order) -> msg) -> Cmd msg
adminOrders token toMsg =
    request "GET" "/admin/orders" (authHeader token) Nothing (Decode.list orderDecoder) toMsg


updateOrderStatus : String -> Int -> String -> (Result Http.Error Order -> msg) -> Cmd msg
updateOrderStatus token orderId status toMsg =
    request "PUT"
        ("/admin/orders/" ++ String.fromInt orderId)
        (authHeader token)
        (Just (Encode.object [ ( "status", Encode.string status ) ]))
        orderDecoder
        toMsg


adminCustomers : String -> (Result Http.Error (List Customer) -> msg) -> Cmd msg
adminCustomers token toMsg =
    request "GET" "/admin/customers" (authHeader token) Nothing (Decode.list customerDecoder) toMsg


updateCustomer : String -> Int -> CustomerInput -> (Result Http.Error Customer -> msg) -> Cmd msg
updateCustomer token id customer toMsg =
    request "PUT" ("/admin/customers/" ++ String.fromInt id) (authHeader token) (Just (encodeCustomer customer)) customerDecoder toMsg


deleteCustomer : String -> Int -> (Result Http.Error Int -> msg) -> Cmd msg
deleteCustomer token id toMsg =
    request "DELETE" ("/admin/customers/" ++ String.fromInt id) (authHeader token) Nothing (Decode.field "deleted" Decode.int) toMsg


revenue : String -> (Result Http.Error (List RevenueRow) -> msg) -> Cmd msg
revenue token toMsg =
    request "GET" "/admin/revenue" (authHeader token) Nothing (Decode.list revenueDecoder) toMsg


signups : String -> (Result Http.Error SignupReport -> msg) -> Cmd msg
signups token toMsg =
    request "GET" "/admin/signups" (authHeader token) Nothing signupReportDecoder toMsg


uploadDecoder : Decoder String
uploadDecoder =
    Decode.field "image" Decode.string


uploadImage : String -> File.File -> (Result Http.Error String -> msg) -> Cmd msg
uploadImage token file toMsg =
    Http.request
        { method = "POST"
        , headers = authHeader token
        , url = baseUrl ++ "/admin/uploads"
        , body = Http.multipartBody [ Http.filePart "file" file ]
        , expect = Http.expectJson toMsg uploadDecoder
        , timeout = Just 60000
        , tracker = Nothing
        }
