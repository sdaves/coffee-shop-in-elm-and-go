module Radix.Heading exposing (..)

import Html exposing (Html)
import Html.Attributes
import Radix
import Radix.Internal
import Radix.Text


type Config msg
    = Config
        { content : String
        , node : String
        , color : Maybe Radix.Color
        , isHighContrast : Bool
        , size : Int
        , weight : Maybe Radix.Text.Weight
        , truncate : Bool
        , alignment : Maybe Radix.Text.Align
        , trim : Maybe Radix.Text.Trim
        , wrap : Maybe Radix.Text.Wrap
        }


asH2 : Config msg -> Config msg
asH2 (Config config) =
    Config { config | node = "h2" }


asH3 : Config msg -> Config msg
asH3 (Config config) =
    Config { config | node = "h3" }


asH4 : Config msg -> Config msg
asH4 (Config config) =
    Config { config | node = "h4" }


asH5 : Config msg -> Config msg
asH5 (Config config) =
    Config { config | node = "h5" }


asH6 : Config msg -> Config msg
asH6 (Config config) =
    Config { config | node = "h6" }


new : String -> Config msg
new content =
    Config
        { content = content
        , node = "h1"
        , color = Nothing
        , isHighContrast = False
        , size = 6
        , weight = Nothing
        , truncate = False
        , alignment = Nothing
        , trim = Nothing
        , wrap = Nothing
        }


withSize : Int -> Config msg -> Config msg
withSize size (Config config) =
    Config
        { config
            | size = size
        }


withWeight : Radix.Text.Weight -> Config msg -> Config msg
withWeight weight (Config config) =
    Config
        { config
            | weight = Just weight
        }


withTruncation : Config msg -> Config msg
withTruncation (Config config) =
    Config
        { config
            | truncate = True
        }


withColor : Radix.Color -> Config msg -> Config msg
withColor color (Config config) =
    Config
        { config
            | color = Just color
        }


withHighContrast : Config msg -> Config msg
withHighContrast (Config config) =
    Config
        { config
            | isHighContrast = True
        }


withAlignment : Radix.Text.Align -> Config msg -> Config msg
withAlignment alignment (Config config) =
    Config
        { config
            | alignment = Just alignment
        }


withTrim : Radix.Text.Trim -> Config msg -> Config msg
withTrim trim (Config config) =
    Config
        { config
            | trim = Just trim
        }


withWrap : Radix.Text.Wrap -> Config msg -> Config msg
withWrap wrap (Config config) =
    Config
        { config
            | wrap = Just wrap
        }


view : Config msg -> Html msg
view (Config config) =
    Html.node config.node
        [ Html.Attributes.classList
            [ ( "rt-Heading", True )
            , ( "rt-r-size-" ++ String.fromInt config.size, True )
            , ( "rt-truncate", config.truncate )
            , ( "rt-high-contrast", config.isHighContrast )
            , Radix.Internal.classListMaybe
                (\weight -> Radix.Text.weightToCss weight)
                config.weight
            , Radix.Internal.classListMaybe
                (\alignment -> Radix.Text.alignToCss alignment)
                config.alignment
            , Radix.Internal.classListMaybe
                (\trim -> Radix.Text.trimToCss trim)
                config.trim
            , Radix.Internal.classListMaybe
                (\wrap -> Radix.Text.wrapToCss wrap)
                config.wrap
            ]
        , Radix.Internal.attributeMaybe
            (\color -> Html.Attributes.attribute "data-accent-color" (Radix.colorToString color))
            config.color
        ]
        [ Html.text config.content
        ]
