module Types exposing
    ( CartItem
    , Customer
    , Order
    , OrderItem
    , Page
    , Product
    , Remote(..)
    , RevenueRow
    , Role(..)
    , Session
    , SignupReport
    , StockRow
    , Tab(..)
    )


type alias Product =
    { sku : String
    , name : String
    , category : String
    , priceCents : Int
    , stock : Int
    , reorderLevel : Int
    , active : Int
    , image : String
    , description : String
    }


type alias Page a =
    { items : List a
    , offset : Int
    , pageSize : Int
    , total : Int
    }


type alias Customer =
    { id : Int
    , email : String
    , fullName : String
    , country : String
    , role : Role
    , createdAt : String
    }


type alias OrderItem =
    { sku : String
    , name : String
    , quantity : Int
    , unitPriceCents : Int
    }


type alias Order =
    { id : Int
    , customerId : Int
    , customerEmail : String
    , customerName : String
    , status : String
    , placedAt : String
    , totalCents : Int
    , items : List OrderItem
    }


type alias CartItem =
    { sku : String
    , name : String
    , priceCents : Int
    , quantity : Int
    }


type alias RevenueRow =
    { category : String
    , orders : Int
    , units : Int
    , revenueCents : Int
    }


type alias StockRow =
    { sku : String
    , name : String
    , stock : Int
    , reorderLevel : Int
    }


type alias SignupReport =
    { today : Int
    , last7Days : Int
    , last30Days : Int
    , last90Days : Int
    }


type Role
    = CustomerRole
    | AdminRole


type alias Session =
    { token : String
    , id : Int
    , email : String
    , name : String
    , role : Role
    }


type Tab
    = Catalog
    | MyOrders
    | AdminProducts
    | AdminOrders
    | AdminCustomers
    | Reports


type Remote a
    = Idle
    | Loading
    | Failure String
    | Success a
