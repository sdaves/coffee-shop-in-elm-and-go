port module Main exposing (AuthMode, CustomerDraft, DeleteRequest(..), Flags, Model, Msg(..), ProductDraft, init, main, update, view)

import Api
import Browser
import File
import Html exposing (Html, div, form, header, img, input, nav, option, select, span, text)
import Html.Attributes exposing (accept, alt, attribute, checked, class, disabled, placeholder, selected, src, type_, value)
import Html.Events exposing (on, onClick, onInput, onSubmit, stopPropagationOn)
import Http
import Json.Decode as Decode
import Radix
import Radix.Badge as Badge
import Radix.Button as Button
import Radix.Callout as Callout
import Radix.Card as Card
import Radix.Heading as Heading
import Radix.Spinner as Spinner
import Radix.Strong as Strong
import Radix.Table as Table
import Radix.Text as RText
import Radix.TextArea as TextArea
import Radix.TextField as TextField
import Set exposing (Set)
import Task
import Time
import TimeAgo
import Types exposing (CartItem, Customer, Order, Page, Product, Remote(..), RevenueRow, Role(..), Session, SignupReport, StockRow, Tab(..))


port storeSession : Maybe String -> Cmd msg


port storeCart : { userId : Int, cart : Maybe String } -> Cmd msg


port requestCart : Int -> Cmd msg


port receiveCart : (Maybe String -> msg) -> Sub msg


type alias Flags =
    { session : Maybe String
    , cart : Maybe String
    }


type AuthMode
    = SignInMode
    | RegisterMode


type alias ProductDraft =
    { sku : String
    , name : String
    , category : String
    , price : String
    , stock : String
    , reorder : String
    , active : Bool
    , image : String
    , description : String
    , isNew : Bool
    }


type alias CustomerDraft =
    { id : Int
    , fullName : String
    , country : String
    , role : Role
    }


type DeleteRequest
    = DeleteProductRequest Product
    | DeleteCustomerRequest Customer


type alias Model =
    { session : Maybe Session
    , authMode : AuthMode
    , authEmail : String
    , authPassword : String
    , authName : String
    , authBusy : Bool
    , authError : Maybe String
    , tab : Tab
    , category : String
    , page : Int
    , pageSize : Int
    , products : Remote (Page Product)
    , selected : Maybe (Remote Product)
    , cartQty : Int
    , cart : List CartItem
    , orderNotice : Maybe String
    , orders : Remote (List Order)
    , adminProducts : Remote (List Product)
    , adminOrders : Remote (List Order)
    , adminCustomers : Remote (List Customer)
    , revenue : Remote (List RevenueRow)
    , signups : Remote SignupReport
    , lowStock : Remote (List StockRow)
    , productDraft : Maybe ProductDraft
    , productError : Maybe String
    , imageUploading : Bool
    , customerDraft : Maybe CustomerDraft
    , deleteRequest : Maybe DeleteRequest
    , now : Time.Posix
    , expandedTimes : Set Int
    }


initialPageSize : Int
initialPageSize =
    6


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        restored =
            flags.session
                |> Maybe.andThen (\json -> Result.toMaybe (Decode.decodeString Api.storedSessionDecoder json))

        restoredCart =
            flags.cart
                |> Maybe.andThen (\json -> Result.toMaybe (Decode.decodeString Api.cartDecoder json))
                |> Maybe.withDefault []

        model =
            { session = restored
            , authMode = SignInMode
            , authEmail = ""
            , authPassword = ""
            , authName = ""
            , authBusy = False
            , authError = Nothing
            , tab = restored |> Maybe.map (.role >> defaultTab) |> Maybe.withDefault Catalog
            , category = ""
            , page = 0
            , pageSize = initialPageSize
            , products = Loading
            , selected = Nothing
            , cartQty = 1
            , cart = restoredCart
            , orderNotice = Nothing
            , orders = Idle
            , adminProducts = Idle
            , adminOrders = Idle
            , adminCustomers = Idle
            , revenue = Idle
            , signups = Idle
            , lowStock = Loading
            , productDraft = Nothing
            , productError = Nothing
            , imageUploading = False
            , customerDraft = Nothing
            , deleteRequest = Nothing
            , now = Time.millisToPosix 0
            , expandedTimes = Set.empty
            }
    in
    ( model
    , Cmd.batch
        (fetchProducts model
            :: Api.lowStock GotLowStock
            :: Task.perform TimeTick Time.now
            :: (case restored of
                    Just session ->
                        [ loadForSession session, Api.me session.token GotSessionValidated ]

                    Nothing ->
                        []
               )
        )
    )


type Msg
    = SetAuthMode AuthMode
    | SetAuthEmail String
    | SetAuthPassword String
    | SetAuthName String
    | SubmitAuth
    | GotAuth (Result Http.Error Session)
    | GotSessionValidated (Result Http.Error Session)
    | SignOut
    | SelectTab Tab
    | SetCategory String
    | NextPage
    | PrevPage
    | OpenProduct String
    | CloseProduct
    | GotProducts (Result Http.Error (Page Product))
    | GotProduct (Result Http.Error Product)
    | SetCartQty String
    | AddToCart Product
    | RemoveCart String
    | PlaceOrder
    | GotOrder (Result Http.Error Order)
    | ReceiveCart (Maybe String)
    | GotMyOrders (Result Http.Error (List Order))
    | GotLowStock (Result Http.Error (List StockRow))
    | GotAdminProducts (Result Http.Error (List Product))
    | GotAdminOrders (Result Http.Error (List Order))
    | GotAdminCustomers (Result Http.Error (List Customer))
    | GotRevenue (Result Http.Error (List RevenueRow))
    | GotSignups (Result Http.Error SignupReport)
    | NewProduct
    | EditProduct Product
    | SetProductField String String
    | SetProductActive Bool
    | CancelProduct
    | SubmitProduct
    | GotSavedProduct (Result Http.Error Product)
    | SelectedImage File.File
    | GotUploadedImage (Result Http.Error String)
    | RequestDeleteProduct Product
    | GotDeletedProduct (Result Http.Error String)
    | SetOrderStatus Int String
    | GotUpdatedOrder (Result Http.Error Order)
    | EditCustomer Customer
    | SetCustomerField String String
    | SetCustomerRole Bool
    | CancelCustomer
    | SubmitCustomer
    | GotSavedCustomer (Result Http.Error Customer)
    | RequestDeleteCustomer Customer
    | ConfirmDelete
    | CancelDelete
    | GotDeletedCustomer (Result Http.Error Int)
    | TimeTick Time.Posix
    | ToggleOrderTime Int
    | NoOp


fetchProducts : Model -> Cmd Msg
fetchProducts model =
    Api.products
        { pageSize = model.pageSize
        , offset = model.page * model.pageSize
        , category =
            if String.isEmpty model.category then
                Nothing

            else
                Just model.category
        , orderBy = "NAME ASC"
        }
        GotProducts


withToken : Model -> (String -> Cmd Msg) -> Cmd Msg
withToken model toCmd =
    case model.session of
        Just session ->
            toCmd session.token

        Nothing ->
            Cmd.none


persistCart : Model -> List CartItem -> Cmd Msg
persistCart model cart =
    case model.session of
        Just session ->
            storeCart { userId = session.id, cart = Just (Api.encodeCart cart) }

        Nothing ->
            Cmd.none


loadForSession : Session -> Cmd Msg
loadForSession session =
    case session.role of
        AdminRole ->
            Cmd.batch
                [ Api.adminProducts session.token GotAdminProducts
                , Api.adminOrders session.token GotAdminOrders
                , Api.adminCustomers session.token GotAdminCustomers
                , Api.revenue session.token GotRevenue
                , Api.signups session.token GotSignups
                ]

        CustomerRole ->
            Api.myOrders session.token GotMyOrders


defaultTab : Role -> Tab
defaultTab role =
    case role of
        AdminRole ->
            AdminProducts

        CustomerRole ->
            Catalog


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetAuthMode mode ->
            ( { model | authMode = mode, authError = Nothing }, Cmd.none )

        SetAuthEmail value_ ->
            ( { model | authEmail = value_ }, Cmd.none )

        SetAuthPassword value_ ->
            ( { model | authPassword = value_ }, Cmd.none )

        SetAuthName value_ ->
            ( { model | authName = value_ }, Cmd.none )

        SubmitAuth ->
            let
                email =
                    String.trim model.authEmail
            in
            if String.isEmpty email || String.isEmpty model.authPassword then
                ( { model | authError = Just "Email and password are required." }, Cmd.none )

            else
                ( { model | authBusy = True, authError = Nothing }
                , case model.authMode of
                    SignInMode ->
                        Api.login { email = email, password = model.authPassword } GotAuth

                    RegisterMode ->
                        Api.register
                            { email = email
                            , password = model.authPassword
                            , name = String.trim model.authName
                            }
                            GotAuth
                )

        GotAuth (Ok session) ->
            let
                next =
                    { model
                        | session = Just session
                        , authBusy = False
                        , authError = Nothing
                        , authPassword = ""
                        , tab = defaultTab session.role
                        , adminProducts = Idle
                        , adminOrders = Idle
                        , adminCustomers = Idle
                        , revenue = Idle
                        , signups = Idle
                        , orders = Idle
                        , cart = []
                    }
            in
            ( next
            , Cmd.batch
                [ loadForSession session
                , storeSession (Just (Api.encodeSession session))
                , requestCart session.id
                ]
            )

        GotAuth (Err err) ->
            ( { model | authBusy = False, authError = Just (httpErrorToString err) }, Cmd.none )

        GotSessionValidated (Ok user) ->
            case model.session of
                Just session ->
                    let
                        validated =
                            { user | token = session.token }

                        next =
                            { model | session = Just validated, tab = defaultTab validated.role }
                    in
                    ( next, storeSession (Just (Api.encodeSession validated)) )

                Nothing ->
                    ( model, Cmd.none )

        GotSessionValidated (Err _) ->
            ( { model | session = Nothing, tab = Catalog, cart = [] }, storeSession Nothing )

        SignOut ->
            ( { model
                | session = Nothing
                , tab = Catalog
                , authMode = SignInMode
                , authEmail = ""
                , authPassword = ""
                , cart = []
                , orderNotice = Nothing
                , orders = Idle
                , adminProducts = Idle
                , adminOrders = Idle
                , adminCustomers = Idle
                , revenue = Idle
                , signups = Idle
              }
            , storeSession Nothing
            )

        SelectTab tab ->
            ( { model | tab = tab }, Cmd.none )

        SetCategory category ->
            let
                next =
                    { model | category = category, page = 0, products = Loading }
            in
            ( next, fetchProducts next )

        NextPage ->
            let
                next =
                    { model | page = model.page + 1, products = Loading }
            in
            ( next, fetchProducts next )

        PrevPage ->
            let
                next =
                    { model | page = max 0 (model.page - 1), products = Loading }
            in
            ( next, fetchProducts next )

        OpenProduct sku ->
            ( { model | selected = Just Loading, cartQty = 1 }, Api.getProduct sku GotProduct )

        CloseProduct ->
            ( { model | selected = Nothing }, Cmd.none )

        GotProducts (Ok page) ->
            ( { model | products = Success page }, Cmd.none )

        GotProducts (Err err) ->
            ( { model | products = Failure (httpErrorToString err) }, Cmd.none )

        GotProduct (Ok product) ->
            ( { model | selected = Just (Success product) }, Cmd.none )

        GotProduct (Err err) ->
            ( { model | selected = Just (Failure (httpErrorToString err)) }, Cmd.none )

        SetCartQty raw ->
            ( { model | cartQty = Maybe.withDefault 1 (String.toInt raw) }, Cmd.none )

        AddToCart product ->
            let
                qty =
                    max 1 model.cartQty

                cart =
                    addToCart product qty model.cart
            in
            ( { model | cart = cart, cartQty = 1, selected = Nothing, orderNotice = Just "Added item to cart" }, persistCart model cart )

        RemoveCart sku ->
            let
                cart =
                    List.filter (\item -> item.sku /= sku) model.cart
            in
            ( { model | cart = cart }, persistCart model cart )

        PlaceOrder ->
            case model.session of
                Just session ->
                    if List.isEmpty model.cart then
                        ( model, Cmd.none )

                    else
                        ( { model | orderNotice = Nothing }
                        , Api.placeOrder session.token
                            (List.map (\item -> { sku = item.sku, quantity = item.quantity }) model.cart)
                            GotOrder
                        )

                Nothing ->
                    ( model, Cmd.none )

        GotOrder (Ok _) ->
            ( { model | cart = [], orderNotice = Just "Order placed!", products = Loading, tab = MyOrders }
            , Cmd.batch
                [ fetchProducts model
                , withToken model (\t -> Api.myOrders t GotMyOrders)
                , persistCart model []
                ]
            )

        GotOrder (Err err) ->
            ( { model | orderNotice = Just ("Could not place order: " ++ httpErrorToString err) }, Cmd.none )

        ReceiveCart raw ->
            ( { model
                | cart =
                    raw
                        |> Maybe.andThen (\json -> Result.toMaybe (Decode.decodeString Api.cartDecoder json))
                        |> Maybe.withDefault []
              }
            , Cmd.none
            )

        GotMyOrders (Ok orders) ->
            ( { model | orders = Success orders }, Cmd.none )

        GotMyOrders (Err err) ->
            ( { model | orders = Failure (httpErrorToString err) }, Cmd.none )

        GotLowStock (Ok rows) ->
            ( { model | lowStock = Success rows }, Cmd.none )

        GotLowStock (Err err) ->
            ( { model | lowStock = Failure (httpErrorToString err) }, Cmd.none )

        GotAdminProducts (Ok list) ->
            ( { model | adminProducts = Success list }, Cmd.none )

        GotAdminProducts (Err err) ->
            ( { model | adminProducts = Failure (httpErrorToString err) }, Cmd.none )

        GotAdminOrders (Ok list) ->
            ( { model | adminOrders = Success list }, Cmd.none )

        GotAdminOrders (Err err) ->
            ( { model | adminOrders = Failure (httpErrorToString err) }, Cmd.none )

        GotAdminCustomers (Ok list) ->
            ( { model | adminCustomers = Success list }, Cmd.none )

        GotAdminCustomers (Err err) ->
            ( { model | adminCustomers = Failure (httpErrorToString err) }, Cmd.none )

        GotRevenue (Ok rows) ->
            ( { model | revenue = Success rows }, Cmd.none )

        GotRevenue (Err err) ->
            ( { model | revenue = Failure (httpErrorToString err) }, Cmd.none )

        GotSignups (Ok report) ->
            ( { model | signups = Success report }, Cmd.none )

        GotSignups (Err err) ->
            ( { model | signups = Failure (httpErrorToString err) }, Cmd.none )

        NewProduct ->
            ( { model | productDraft = Just emptyDraft, productError = Nothing, imageUploading = False }, Cmd.none )

        EditProduct product ->
            ( { model | productDraft = Just (draftFromProduct product), productError = Nothing, imageUploading = False }, Cmd.none )

        SetProductField field raw ->
            ( { model | productDraft = Maybe.map (setProductField field raw) model.productDraft }, Cmd.none )

        SetProductActive active ->
            ( { model | productDraft = Maybe.map (\draft -> { draft | active = active }) model.productDraft }, Cmd.none )

        CancelProduct ->
            ( { model | productDraft = Nothing, productError = Nothing, imageUploading = False }, Cmd.none )

        SubmitProduct ->
            case model.productDraft of
                Nothing ->
                    ( model, Cmd.none )

                Just draft ->
                    case draftToInput draft of
                        Err message ->
                            ( { model | productError = Just message }, Cmd.none )

                        Ok input ->
                            ( { model | productError = Nothing }
                            , withToken model
                                (\token ->
                                    if draft.isNew then
                                        Api.createProduct token input GotSavedProduct

                                    else
                                        Api.updateProduct token input GotSavedProduct
                                )
                            )

        GotSavedProduct (Ok _) ->
            ( { model | productDraft = Nothing, adminProducts = Loading, imageUploading = False }
            , withToken model (\t -> Api.adminProducts t GotAdminProducts)
            )

        GotSavedProduct (Err err) ->
            ( { model | productError = Just (httpErrorToString err) }, Cmd.none )

        SelectedImage file ->
            if File.size file > 5 * 1024 * 1024 then
                ( { model | productError = Just "Image must be 5 MB or smaller." }, Cmd.none )

            else
                ( { model | imageUploading = True, productError = Nothing }
                , withToken model (\token -> Api.uploadImage token file GotUploadedImage)
                )

        GotUploadedImage (Ok image) ->
            ( { model
                | imageUploading = False
                , productDraft = Maybe.map (\draft -> { draft | image = image }) model.productDraft
              }
            , Cmd.none
            )

        GotUploadedImage (Err err) ->
            ( { model | imageUploading = False, productError = Just (httpErrorToString err) }, Cmd.none )

        RequestDeleteProduct product ->
            ( { model | deleteRequest = Just (DeleteProductRequest product) }, Cmd.none )

        GotDeletedProduct (Ok _) ->
            ( { model | adminProducts = Loading }
            , withToken model (\t -> Api.adminProducts t GotAdminProducts)
            )

        GotDeletedProduct (Err err) ->
            ( { model | adminProducts = Failure (httpErrorToString err) }, Cmd.none )

        SetOrderStatus orderId status ->
            ( model, withToken model (\t -> Api.updateOrderStatus t orderId status GotUpdatedOrder) )

        GotUpdatedOrder (Ok _) ->
            ( { model | adminOrders = Loading }
            , withToken model (\t -> Api.adminOrders t GotAdminOrders)
            )

        GotUpdatedOrder (Err err) ->
            ( { model | adminOrders = Failure (httpErrorToString err) }, Cmd.none )

        EditCustomer customer ->
            ( { model
                | customerDraft =
                    Just
                        { id = customer.id
                        , fullName = customer.fullName
                        , country = customer.country
                        , role = customer.role
                        }
              }
            , Cmd.none
            )

        SetCustomerField field raw ->
            ( { model | customerDraft = Maybe.map (setCustomerField field raw) model.customerDraft }, Cmd.none )

        SetCustomerRole isAdmin ->
            ( { model | customerDraft = Maybe.map (\draft -> { draft | role = roleFromBool isAdmin }) model.customerDraft }, Cmd.none )

        CancelCustomer ->
            ( { model | customerDraft = Nothing }, Cmd.none )

        SubmitCustomer ->
            case model.customerDraft of
                Just draft ->
                    ( model
                    , withToken model
                        (\token ->
                            Api.updateCustomer token
                                draft.id
                                { fullName = String.trim draft.fullName
                                , country = String.trim draft.country
                                , role = draft.role
                                }
                                GotSavedCustomer
                        )
                    )

                Nothing ->
                    ( model, Cmd.none )

        GotSavedCustomer (Ok _) ->
            ( { model | customerDraft = Nothing, adminCustomers = Loading }
            , withToken model (\t -> Api.adminCustomers t GotAdminCustomers)
            )

        GotSavedCustomer (Err err) ->
            ( { model | adminCustomers = Failure (httpErrorToString err) }, Cmd.none )

        RequestDeleteCustomer customer ->
            ( { model | deleteRequest = Just (DeleteCustomerRequest customer) }, Cmd.none )

        ConfirmDelete ->
            case model.deleteRequest of
                Just (DeleteProductRequest product) ->
                    ( { model | deleteRequest = Nothing }
                    , withToken model (\t -> Api.deleteProduct t product.sku GotDeletedProduct)
                    )

                Just (DeleteCustomerRequest customer) ->
                    ( { model | deleteRequest = Nothing }
                    , withToken model (\t -> Api.deleteCustomer t customer.id GotDeletedCustomer)
                    )

                Nothing ->
                    ( model, Cmd.none )

        CancelDelete ->
            ( { model | deleteRequest = Nothing }, Cmd.none )

        GotDeletedCustomer (Ok _) ->
            ( { model | adminCustomers = Loading }
            , withToken model (\t -> Api.adminCustomers t GotAdminCustomers)
            )

        GotDeletedCustomer (Err err) ->
            ( { model | adminCustomers = Failure (httpErrorToString err) }, Cmd.none )

        TimeTick now ->
            ( { model | now = now }, Cmd.none )

        ToggleOrderTime orderId ->
            ( { model
                | expandedTimes =
                    if Set.member orderId model.expandedTimes then
                        Set.remove orderId model.expandedTimes

                    else
                        Set.insert orderId model.expandedTimes
              }
            , Cmd.none
            )

        NoOp ->
            ( model, Cmd.none )


addToCart : Product -> Int -> List CartItem -> List CartItem
addToCart product quantity cart =
    if List.any (\item -> item.sku == product.sku) cart then
        List.map
            (\item ->
                if item.sku == product.sku then
                    { item | quantity = item.quantity + quantity }

                else
                    item
            )
            cart

    else
        cart ++ [ { sku = product.sku, name = product.name, priceCents = product.priceCents, quantity = quantity } ]


emptyDraft : ProductDraft
emptyDraft =
    { sku = "", name = "", category = "coffee", price = "0", stock = "0", reorder = "10", active = True, image = "", description = "", isNew = True }


draftFromProduct : Product -> ProductDraft
draftFromProduct product =
    { sku = product.sku
    , name = product.name
    , category = product.category
    , price = String.fromInt product.priceCents
    , stock = String.fromInt product.stock
    , reorder = String.fromInt product.reorderLevel
    , active = product.active /= 0
    , image = product.image
    , description = product.description
    , isNew = False
    }


setProductField : String -> String -> ProductDraft -> ProductDraft
setProductField field raw draft =
    case field of
        "sku" ->
            { draft | sku = raw }

        "name" ->
            { draft | name = raw }

        "category" ->
            { draft | category = raw }

        "price" ->
            { draft | price = raw }

        "stock" ->
            { draft | stock = raw }

        "reorder" ->
            { draft | reorder = raw }

        "image" ->
            { draft | image = raw }

        "description" ->
            { draft | description = raw }

        _ ->
            draft


draftToInput : ProductDraft -> Result String Api.ProductInput
draftToInput draft =
    if String.trim draft.name == "" || String.trim draft.category == "" then
        Err "Name and category are required."

    else if draft.isNew && String.trim draft.sku == "" then
        Err "SKU is required for a new product."

    else
        case ( String.toInt (String.trim draft.price), String.toInt (String.trim draft.stock), String.toInt (String.trim draft.reorder) ) of
            ( Just price, Just stock, Just reorder ) ->
                if price < 0 || stock < 0 || reorder < 0 then
                    Err "Price, stock and reorder level cannot be negative."

                else
                    Ok
                        { sku = String.trim draft.sku
                        , name = String.trim draft.name
                        , category = String.trim draft.category
                        , priceCents = price
                        , stock = stock
                        , reorderLevel = reorder
                        , active = draft.active
                        , image = String.trim draft.image
                        , description = String.trim draft.description
                        }

            _ ->
                Err "Price, stock and reorder level must be whole numbers."


roleFromBool : Bool -> Role
roleFromBool isAdmin =
    if isAdmin then
        AdminRole

    else
        CustomerRole


httpErrorToString : Http.Error -> String
httpErrorToString err =
    case err of
        Http.BadUrl u ->
            "Bad URL: " ++ u

        Http.Timeout ->
            "Request timed out."

        Http.NetworkError ->
            "Network error. Is the API server running?"

        Http.BadStatus code ->
            "Server returned HTTP " ++ String.fromInt code ++ "."

        Http.BadBody body ->
            "Unexpected response: " ++ body


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.batch [ receiveCart ReceiveCart, Time.every 1000 TimeTick ]
        }



-- RADIX HELPERS


rHeading : String -> Html msg
rHeading label =
    Heading.view (Heading.new label |> Heading.asH3)


rCardTitle : String -> Html msg
rCardTitle label =
    Heading.view (Heading.new label |> Heading.asH4)


rText : String -> Html msg
rText s =
    RText.view (RText.new [ text s ])


rMuted : String -> Html msg
rMuted s =
    RText.view (RText.new [ text s ] |> RText.withColor Radix.Gray)


rTextBlock : String -> Html msg
rTextBlock s =
    RText.view (RText.new [ text s ] |> RText.asDiv)


rMutedBlock : String -> Html msg
rMutedBlock s =
    RText.view (RText.new [ text s ] |> RText.withColor Radix.Gray |> RText.asDiv)


rStrong : String -> Html msg
rStrong s =
    Strong.view (Strong.new s)


rPrimary : msg -> String -> Html msg
rPrimary onClick_ label =
    Button.view (Button.new { content = [ text label ], onClick = onClick_ })


rDanger : msg -> String -> Html msg
rDanger onClick_ label =
    Button.view (Button.new { content = [ text label ], onClick = onClick_ } |> Button.withAccentColor Radix.Red)


rSoft : msg -> String -> Html msg
rSoft onClick_ label =
    Button.view (Button.new { content = [ text label ], onClick = onClick_ } |> Button.withVariantSoft)


rGhost : msg -> String -> Html msg
rGhost onClick_ label =
    Button.view (Button.new { content = [ text label ], onClick = onClick_ } |> Button.withVariantGhost)


rSoftDisabled : msg -> String -> Bool -> Html msg
rSoftDisabled onClick_ label isDisabled =
    Button.view
        (Button.new { content = [ text label ], onClick = onClick_ }
            |> Button.withVariantSoft
            |> (\c ->
                    if isDisabled then
                        Button.withIsDisabled c

                    else
                        c
               )
        )


rPrimaryDisabled : msg -> String -> Bool -> Html msg
rPrimaryDisabled onClick_ label isDisabled =
    Button.view
        (Button.new { content = [ text label ], onClick = onClick_ }
            |> (\c ->
                    if isDisabled then
                        Button.withIsDisabled c

                    else
                        c
               )
        )


rBadge : Radix.Color -> String -> Html msg
rBadge color label =
    Badge.view (Badge.new label |> Badge.withColor color |> Badge.withVariantSurface)


rInput : { value : String, onInput : String -> msg, label : String, inputType : String, isDisabled : Bool } -> Html msg
rInput options =
    TextField.view
        (TextField.new { value = options.value, onInput = options.onInput }
            |> TextField.withCustomAttributes
                [ type_ options.inputType
                , placeholder options.label
                , attribute "aria-label" options.label
                , disabled options.isDisabled
                ]
        )


rTextarea : { value : String, onInput : String -> msg, label : String } -> Html msg
rTextarea options =
    TextArea.view
        (TextArea.new { value = options.value, onInput = options.onInput }
            |> TextArea.withResizeVertical
            |> TextArea.withCustomAttributes
                [ placeholder options.label
                , attribute "aria-label" options.label
                ]
        )


rAlert : String -> Html msg
rAlert message =
    Callout.view
        (Callout.new { content = [ text message ], icon = text "!" }
            |> Callout.withColor Radix.Red
            |> Callout.withIsAlert
        )


rNotice : String -> Html msg
rNotice message =
    Callout.view
        (Callout.new { content = [ text message ], icon = text "+" }
            |> Callout.withColor Radix.Green
        )


rTable : { data : List data, columns : List { header : Html msg, cell : data -> Html msg } } -> Html msg
rTable options =
    Table.view (Table.new options)


statusColor : String -> Radix.Color
statusColor status =
    case status of
        "paid" ->
            Radix.Green

        "shipped" ->
            Radix.Blue

        "cancelled" ->
            Radix.Red

        _ ->
            Radix.Amber


view : Model -> Html Msg
view model =
    div [ class "app" ]
        [ viewHeader model
        , viewTabs model
        , case model.tab of
            Catalog ->
                viewCatalog model

            MyOrders ->
                viewMyOrders model

            AdminProducts ->
                viewAdminProducts model

            AdminOrders ->
                viewAdminOrders model

            AdminCustomers ->
                viewAdminCustomers model

            Reports ->
                viewReports model
        , viewProductModal model
        , viewProductEditor model
        , viewCustomerEditor model
        , viewConfirmDelete model
        ]


viewHeader : Model -> Html Msg
viewHeader model =
    header [ class "topbar" ]
        [ div [ class "brand" ]
            [ span [ class "logo" ] [ text "☕" ]
            , rHeading "Kafejo"
            ]
        , case model.session of
            Just session ->
                div [ class "auth" ]
                    [ rMuted (session.name ++ " · " ++ roleLabel session.role)
                    , rGhost SignOut "Sign out"
                    ]

            Nothing ->
                viewAuthForm model
        ]


viewAuthForm : Model -> Html Msg
viewAuthForm model =
    div [ class "auth auth-form" ]
        [ div [ class "segmented" ]
            [ if model.authMode == SignInMode then
                rPrimary (SetAuthMode SignInMode) "Sign in"

              else
                rSoft (SetAuthMode SignInMode) "Sign in"
            , if model.authMode == RegisterMode then
                rPrimary (SetAuthMode RegisterMode) "Register"

              else
                rSoft (SetAuthMode RegisterMode) "Register"
            ]
        , form [ class "auth-fields", onSubmit SubmitAuth ]
            [ div [ class "auth-inputs" ]
                [ rInput { value = model.authEmail, onInput = SetAuthEmail, label = "Email", inputType = "email", isDisabled = False }
                , rInput { value = model.authPassword, onInput = SetAuthPassword, label = "Password", inputType = "password", isDisabled = False }
                , if model.authMode == RegisterMode then
                    rInput { value = model.authName, onInput = SetAuthName, label = "Full name", inputType = "text", isDisabled = False }

                  else
                    text ""
                ]
            , case model.authError of
                Just message ->
                    rAlert message

                Nothing ->
                    text ""
            , div [ class "auth-actions" ]
                [ div [ class "hint creds" ]
                    [ cred "admin@acme.test" "admin123"
                    , cred "ada@example.com" "customer123"
                    ]
                , rPrimaryDisabled SubmitAuth
                    (if model.authBusy then
                        "…"

                     else
                        "Go"
                    )
                    model.authBusy
                ]
            ]
        ]


cred : String -> String -> Html msg
cred email password =
    div [ class "cred" ]
        [ span [ class "cred-email" ] [ text email ]
        , span [ class "cred-pass" ] [ text password ]
        ]


viewTabs : Model -> Html Msg
viewTabs model =
    nav [ class "tabs" ] (List.map (tabButton model) (tabsFor model))


tabsFor : Model -> List ( Tab, String )
tabsFor model =
    case model.session of
        Just session ->
            case session.role of
                AdminRole ->
                    [ ( AdminProducts, "Products" ), ( AdminOrders, "Orders" ), ( AdminCustomers, "Customers" ), ( Reports, "Reports" ) ]

                CustomerRole ->
                    [ ( Catalog, "Catalog" ), ( MyOrders, "My Orders" ) ]

        Nothing ->
            [ ( Catalog, "Catalog" ) ]


tabButton : Model -> ( Tab, String ) -> Html Msg
tabButton model ( tab, label ) =
    if model.tab == tab then
        rPrimary (SelectTab tab) label

    else
        rSoft (SelectTab tab) label


viewCatalog : Model -> Html Msg
viewCatalog model =
    let
        cartView =
            if isCustomer model then
                viewCart model

            else
                text ""
    in
    div [ class "panel" ]
        [ cartView
        , div [ class "toolbar" ]
            [ div [ class "field-row" ]
                [ rMuted "Category"
                , select [ onInput SetCategory ]
                    [ option [ value "", selected (model.category == "") ] [ text "All" ]
                    , option [ value "coffee", selected (model.category == "coffee") ] [ text "Coffee" ]
                    , option [ value "tea", selected (model.category == "tea") ] [ text "Tea" ]
                    , option [ value "accessory", selected (model.category == "accessory") ] [ text "Accessories" ]
                    ]
                ]
            ]
        , viewRemote model.products viewProductGrid
        , viewPager model
        ]


isCustomer : Model -> Bool
isCustomer model =
    case model.session of
        Just session ->
            session.role == CustomerRole

        Nothing ->
            False


isGuest : Model -> Bool
isGuest model =
    case model.session of
        Nothing ->
            True

        Just _ ->
            False


modalClick : Html.Attribute Msg
modalClick =
    stopPropagationOn "click" (Decode.succeed ( NoOp, True ))


viewProductGrid : Page Product -> Html Msg
viewProductGrid page =
    if List.isEmpty page.items then
        rMuted "No products match."

    else
        div [ class "grid" ] (List.map viewProductCard page.items)


viewProductCard : Product -> Html Msg
viewProductCard product =
    div [ class "product-card", onClick (OpenProduct product.sku) ]
        [ Card.view
            (Card.new
                [ img [ class "product-image", src (imageUrl product.image), alt product.name ] []
                , rCardTitle product.name
                , div [ class "card-bottom" ]
                    [ div [ class "card-col card-left" ] [ rMuted product.category ]
                    , div [ class "card-col card-center" ]
                        [ rBadge
                            (if product.stock <= 5 then
                                Radix.Red

                             else
                                Radix.Green
                            )
                            (String.fromInt product.stock ++ " in stock")
                        ]
                    , div [ class "card-col card-right" ]
                        [ RText.view (RText.new [ text (money product.priceCents) ] |> RText.withWeight RText.Bold) ]
                    ]
                ]
            )
        ]


viewPager : Model -> Html Msg
viewPager model =
    case model.products of
        Success page ->
            let
                from =
                    page.offset + 1

                to =
                    page.offset + List.length page.items

                hasPrev =
                    model.page > 0

                hasNext =
                    page.offset + List.length page.items < page.total
            in
            div [ class "pager" ]
                [ rSoftDisabled PrevPage "← Prev" (not hasPrev)
                , rMuted (String.fromInt from ++ "–" ++ String.fromInt to ++ " of " ++ String.fromInt page.total)
                , rSoftDisabled NextPage "Next →" (not hasNext)
                ]

        _ ->
            text ""


viewCart : Model -> Html Msg
viewCart model =
    div [ class "cart" ]
        [ rHeading "Your cart"
        , if List.isEmpty model.cart then
            rMuted "No items yet. Open a product to add it."

          else
            div []
                [ rTable { data = model.cart, columns = cartColumns }
                , div [ class "cart-total" ]
                    [ rStrong ("Total: " ++ money (cartTotal model.cart))
                    , rPrimary PlaceOrder "Place order"
                    ]
                ]
        , case model.orderNotice of
            Just notice ->
                rNotice notice

            Nothing ->
                text ""
        ]


cartColumns : List { header : Html Msg, cell : CartItem -> Html Msg }
cartColumns =
    [ { header = text "Item", cell = \item -> rText item.name }
    , { header = text "Qty", cell = \item -> rText (String.fromInt item.quantity) }
    , { header = text "Price", cell = \item -> rText (money (item.priceCents * item.quantity)) }
    , { header = text "", cell = \item -> rGhost (RemoveCart item.sku) "Remove" }
    ]


cartTotal : List CartItem -> Int
cartTotal cart =
    List.sum (List.map (\item -> item.priceCents * item.quantity) cart)


viewMyOrders : Model -> Html Msg
viewMyOrders model =
    div [ class "panel" ]
        [ rHeading "My orders"
        , viewRemote model.orders (viewOrdersList model)
        ]


orderTimeText : Model -> Order -> String
orderTimeText model order =
    if Set.member order.id model.expandedTimes then
        order.placedAt

    else
        TimeAgo.fromTimestamp model.now order.placedAt


viewOrdersList : Model -> List Order -> Html Msg
viewOrdersList model orders =
    if List.isEmpty orders then
        rMuted "You have not placed any orders yet."

    else
        div [] (List.map (viewOrderCard model) orders)


viewOrderCard : Model -> Order -> Html Msg
viewOrderCard model order =
    Card.view
        (Card.new
            [ div [ class "order-head" ]
                [ rStrong ("Order #" ++ String.fromInt order.id)
                , rBadge (statusColor order.status) order.status
                , RText.view
                    (RText.new [ text (orderTimeText model order) ]
                        |> RText.withColor Radix.Gray
                        |> RText.withCustomClassList [ ( "time-toggle", True ) ]
                        |> RText.withCustomAttributes [ onClick (ToggleOrderTime order.id) ]
                    )
                ]
            , rTable { data = order.items, columns = orderItemColumns }
            , div [ class "order-total" ] [ text ("Total: " ++ money order.totalCents) ]
            ]
        )


orderItemColumns : List { header : Html Msg, cell : Types.OrderItem -> Html Msg }
orderItemColumns =
    [ { header = text "Item", cell = \item -> rText item.name }
    , { header = text "Qty", cell = \item -> rText (String.fromInt item.quantity) }
    , { header = text "Unit", cell = \item -> rText (money item.unitPriceCents) }
    , { header = text "Subtotal", cell = \item -> rText (money (item.unitPriceCents * item.quantity)) }
    ]


viewAdminProducts : Model -> Html Msg
viewAdminProducts model =
    div [ class "panel" ]
        [ div [ class "panel-head" ]
            [ rHeading "Products"
            , rPrimary NewProduct "New product"
            ]
        , viewRemote model.adminProducts viewAdminProductTable
        ]


viewAdminProductTable : List Product -> Html Msg
viewAdminProductTable products =
    rTable { data = products, columns = adminProductColumns }


adminProductColumns : List { header : Html Msg, cell : Product -> Html Msg }
adminProductColumns =
    [ { header = text "SKU", cell = \product -> rText product.sku }
    , { header = text "Name", cell = \product -> rText product.name }
    , { header = text "Category", cell = \product -> rText product.category }
    , { header = text "Price", cell = \product -> rText (money product.priceCents) }
    , { header = text "Stock", cell = \product -> rText (String.fromInt product.stock) }
    , { header = text "Active", cell = \product -> rText (if product.active /= 0 then "yes" else "no") }
    , { header = text "", cell = \product -> div [] [ rGhost (EditProduct product) "Edit", rGhost (RequestDeleteProduct product) "Delete" ] }
    ]


viewAdminOrders : Model -> Html Msg
viewAdminOrders model =
    div [ class "panel" ]
        [ rHeading "All orders"
        , viewRemote model.adminOrders viewAdminOrderTable
        ]


viewAdminOrderTable : List Order -> Html Msg
viewAdminOrderTable orders =
    rTable { data = orders, columns = adminOrderColumns }


adminOrderColumns : List { header : Html Msg, cell : Order -> Html Msg }
adminOrderColumns =
    [ { header = text "Order", cell = \order -> rText (String.fromInt order.id) }
    , { header = text "Customer", cell = \order -> rText (order.customerName ++ " (" ++ order.customerEmail ++ ")") }
    , { header = text "Total", cell = \order -> rText (money order.totalCents) }
    , { header = text "Placed", cell = \order -> rText order.placedAt }
    , { header = text "Status", cell = \order -> statusSelect order }
    ]


viewAdminCustomers : Model -> Html Msg
viewAdminCustomers model =
    div [ class "panel" ]
        [ rHeading "Customers"
        , viewRemote model.adminCustomers viewAdminCustomerTable
        ]


viewAdminCustomerTable : List Customer -> Html Msg
viewAdminCustomerTable customers =
    rTable { data = customers, columns = adminCustomerColumns }


adminCustomerColumns : List { header : Html Msg, cell : Customer -> Html Msg }
adminCustomerColumns =
    [ { header = text "ID", cell = \customer -> rText (String.fromInt customer.id) }
    , { header = text "Name", cell = \customer -> rText customer.fullName }
    , { header = text "Email", cell = \customer -> rText customer.email }
    , { header = text "Country", cell = \customer -> rText customer.country }
    , { header = text "Role", cell = \customer -> rText (roleLabel customer.role) }
    , { header = text "", cell = \customer -> div [] [ rGhost (EditCustomer customer) "Edit", rGhost (RequestDeleteCustomer customer) "Delete" ] }
    ]


viewReports : Model -> Html Msg
viewReports model =
    div [ class "panel" ]
        [ rHeading "New users"
        , viewRemote model.signups viewSignupTable
        , rHeading "Low stock"
        , viewRemote model.lowStock viewStockTable
        , rHeading "Revenue by category"
        , viewRemote model.revenue viewRevenueTable
        ]


viewSignupTable : SignupReport -> Html Msg
viewSignupTable report =
    rTable
        { data =
            [ ( "Today", report.today )
            , ( "Last 7 days", report.last7Days )
            , ( "Last 30 days", report.last30Days )
            , ( "Last 90 days", report.last90Days )
            ]
        , columns =
            [ { header = text "Window", cell = \( label, _ ) -> rText label }
            , { header = text "New users", cell = \( _, count ) -> rText (String.fromInt count) }
            ]
        }


viewStockTable : List StockRow -> Html Msg
viewStockTable rows =
    if List.isEmpty rows then
        rMuted "Nothing is below its reorder level."

    else
        rTable
            { data = rows
            , columns =
                [ { header = text "SKU", cell = \row -> rText row.sku }
                , { header = text "Name", cell = \row -> rText row.name }
                , { header = text "Stock", cell = \row -> rText (String.fromInt row.stock) }
                , { header = text "Reorder at", cell = \row -> rText (String.fromInt row.reorderLevel) }
                ]
            }


viewRevenueTable : List RevenueRow -> Html Msg
viewRevenueTable rows =
    rTable
        { data = rows
        , columns =
            [ { header = text "Category", cell = \row -> rText row.category }
            , { header = text "Orders", cell = \row -> rText (String.fromInt row.orders) }
            , { header = text "Units", cell = \row -> rText (String.fromInt row.units) }
            , { header = text "Revenue", cell = \row -> rText (money row.revenueCents) }
            ]
        }


statusSelect : Order -> Html Msg
statusSelect order =
    select [ onInput (SetOrderStatus order.id) ]
        (List.map (statusOption order.status) [ "pending", "paid", "shipped", "cancelled" ])


statusOption : String -> String -> Html Msg
statusOption current status =
    option [ value status, selected (current == status) ] [ text status ]


viewProductModal : Model -> Html Msg
viewProductModal model =
    case model.selected of
        Nothing ->
            text ""

        Just remote ->
            div [ class "modal-backdrop", onClick CloseProduct ]
                [ div [ class "modal", modalClick ]
                    [ div [ class "modal-close" ] [ rGhost CloseProduct "×" ]
                    , viewRemote remote (viewProductDetail model)
                    ]
                ]


viewProductDetail : Model -> Product -> Html Msg
viewProductDetail model product =
    div []
        [ img [ class "product-image product-image-lg", src (imageUrl product.image), alt product.name ] []
        , rHeading product.name
        , rMutedBlock product.sku
        , rTextBlock ("Category: " ++ product.category)
        , RText.view (RText.new [ text ("Price: " ++ money product.priceCents) ] |> RText.withWeight RText.Bold |> RText.asDiv)
        , rTextBlock ("In stock: " ++ String.fromInt product.stock)
        , if isCustomer model then
            div [ class "add-row" ]
                [ rInput { value = String.fromInt model.cartQty, onInput = SetCartQty, label = "Qty", inputType = "number", isDisabled = False }
                , rPrimary (AddToCart product) "Add to cart"
                ]

          else if isGuest model then
            rMuted "Sign in or register to add to cart."

          else
            text ""
        , if String.isEmpty product.description then
            text ""

          else
            div [ class "product-description" ] [ rTextBlock product.description ]
        ]


viewProductEditor : Model -> Html Msg
viewProductEditor model =
    case model.productDraft of
        Nothing ->
            text ""

        Just draft ->
            div [ class "modal-backdrop", onClick CancelProduct ]
                [ div [ class "modal", modalClick ]
                    [ div [ class "modal-close" ] [ rGhost CancelProduct "×" ]
                    , rHeading
                        (if draft.isNew then
                            "New product"

                         else
                            "Edit product"
                        )
                    , labeled "SKU" (rInput { value = draft.sku, onInput = SetProductField "sku", label = "SKU", inputType = "text", isDisabled = not draft.isNew })
                    , labeled "Name" (rInput { value = draft.name, onInput = SetProductField "name", label = "Name", inputType = "text", isDisabled = False })
                    , labeled "Category"
                        (select [ onInput (SetProductField "category") ]
                            [ option [ value "coffee", selected (draft.category == "coffee") ] [ text "coffee" ]
                            , option [ value "tea", selected (draft.category == "tea") ] [ text "tea" ]
                            , option [ value "accessory", selected (draft.category == "accessory") ] [ text "accessory" ]
                            ]
                        )
                    , labeled "Price (cents)" (rInput { value = draft.price, onInput = SetProductField "price", label = "Price", inputType = "number", isDisabled = False })
                    , labeled "Stock" (rInput { value = draft.stock, onInput = SetProductField "stock", label = "Stock", inputType = "number", isDisabled = False })
                    , labeled "Reorder level" (rInput { value = draft.reorder, onInput = SetProductField "reorder", label = "Reorder level", inputType = "number", isDisabled = False })
                    , labeled "Image" (rInput { value = draft.image, onInput = SetProductField "image", label = "Image", inputType = "text", isDisabled = False })
                    , labeled "Description" (rTextarea { value = draft.description, onInput = SetProductField "description", label = "Description" })
                    , div [ class "uploader" ]
                        [ img [ class "product-image", src (imageUrl draft.image), alt draft.name ] []
                        , input
                            [ type_ "file"
                            , accept "image/*,image/svg+xml"
                            , on "change" (Decode.map SelectedImage (Decode.at [ "target", "files" ] (Decode.index 0 File.decoder)))
                            ]
                            []
                        , if model.imageUploading then
                            rMuted "Uploading…"

                          else
                            text ""
                        ]
                    , div [ class "checkbox-row", onClick (SetProductActive (not draft.active)) ]
                        [ input [ type_ "checkbox", checked draft.active, attribute "aria-hidden" "true", attribute "tabindex" "-1" ] []
                        , text "Active"
                        ]
                    , case model.productError of
                        Just message ->
                            rAlert message

                        Nothing ->
                            text ""
                    , div [ class "modal-actions" ]
                        [ rPrimary SubmitProduct "Save"
                        , rGhost CancelProduct "Cancel"
                        ]
                    ]
                ]


viewCustomerEditor : Model -> Html Msg
viewCustomerEditor model =
    case model.customerDraft of
        Nothing ->
            text ""

        Just draft ->
            div [ class "modal-backdrop", onClick CancelCustomer ]
                [ div [ class "modal", modalClick ]
                    [ div [ class "modal-close" ] [ rGhost CancelCustomer "×" ]
                    , rHeading ("Edit customer #" ++ String.fromInt draft.id)
                    , labeled "Full name" (rInput { value = draft.fullName, onInput = SetCustomerField "name", label = "Full name", inputType = "text", isDisabled = False })
                    , labeled "Role"
                        (select [ onInput (\v -> SetCustomerRole (v == "admin")) ]
                            [ option [ value "customer", selected (draft.role == CustomerRole) ] [ text "customer" ]
                            , option [ value "admin", selected (draft.role == AdminRole) ] [ text "admin" ]
                            ]
                        )
                    , div [ class "modal-actions" ]
                        [ rPrimary SubmitCustomer "Save"
                        , rGhost CancelCustomer "Cancel"
                        ]
                    ]
                ]


viewConfirmDelete : Model -> Html Msg
viewConfirmDelete model =
    case model.deleteRequest of
        Nothing ->
            text ""

        Just request ->
            div [ class "modal-backdrop", onClick CancelDelete ]
                [ div [ class "modal", modalClick ]
                    [ div [ class "modal-close" ] [ rGhost CancelDelete "×" ]
                    , rHeading "Confirm delete"
                    , rTextBlock (deleteMessage request)
                    , div [ class "modal-actions" ]
                        [ rDanger ConfirmDelete "Delete"
                        , rGhost CancelDelete "Cancel"
                        ]
                    ]
                ]


deleteMessage : DeleteRequest -> String
deleteMessage request =
    case request of
        DeleteProductRequest product ->
            "Delete product \"" ++ product.name ++ "\" (" ++ product.sku ++ ")? This cannot be undone."

        DeleteCustomerRequest customer ->
            "Delete customer \"" ++ customer.fullName ++ "\"? This cannot be undone."


labeled : String -> Html msg -> Html msg
labeled label content =
    div [ class "stack" ]
        [ rMuted label
        , content
        ]


setCustomerField : String -> String -> CustomerDraft -> CustomerDraft
setCustomerField field raw draft =
    case field of
        "name" ->
            { draft | fullName = raw }

        _ ->
            draft


viewRemote : Remote a -> (a -> Html Msg) -> Html Msg
viewRemote remote render =
    case remote of
        Idle ->
            text ""

        Loading ->
            Spinner.view Spinner.new

        Failure message ->
            rAlert message

        Success value ->
            render value


roleLabel : Role -> String
roleLabel role =
    case role of
        AdminRole ->
            "admin"

        CustomerRole ->
            "customer"


money : Int -> String
money cents =
    "$" ++ String.fromInt (cents // 100) ++ "." ++ String.padLeft 2 '0' (String.fromInt (modBy 100 cents))


imageUrl : String -> String
imageUrl image =
    if String.isEmpty image then
        "/uploads/placeholder.svg"

    else
        "/uploads/" ++ image
