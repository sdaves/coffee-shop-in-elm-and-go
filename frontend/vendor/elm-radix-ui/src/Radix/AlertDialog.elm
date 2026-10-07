module Radix.AlertDialog exposing (..)

import Html exposing (Html)
import Html.Attributes
import Html.Events
import Radix
import Radix.Heading
import Radix.Internal
import Radix.Modal
import Radix.Text


type Config msg
    = Config
        { size : Size
        , width : Maybe String
        , minWidth : Maybe String
        , maxWidth : String
        , open : Bool
        , onClose : msg
        , title : Maybe String
        , description : List (Html msg)
        , body : List (Html msg)

        --
        , customClassList : List ( String, Bool )
        , customStyles : List ( String, String )
        , customAttributes : List (Html.Attribute msg)
        }


new :
    { open : Bool
    , onClose : msg
    , body : List (Html msg)
    }
    -> Config msg
new options =
    Config
        { size = Size3
        , width = Nothing
        , minWidth = Nothing
        , maxWidth = "600px"
        , open = options.open
        , onClose = options.onClose
        , title = Nothing
        , description = []
        , body = options.body

        --
        , customClassList = []
        , customStyles = []
        , customAttributes = []
        }


withTitle : String -> Config msg -> Config msg
withTitle title (Config config) =
    Config { config | title = Just title }


withDescription : List (Html msg) -> Config msg -> Config msg
withDescription description (Config config) =
    Config { config | description = description }


type Size
    = Size1
    | Size2
    | Size3
    | Size4


withSize1 : Config msg -> Config msg
withSize1 (Config config) =
    Config { config | size = Size1 }


withSize2 : Config msg -> Config msg
withSize2 (Config config) =
    Config { config | size = Size2 }


withSize4 : Config msg -> Config msg
withSize4 (Config config) =
    Config { config | size = Size4 }


withWidth : String -> Config msg -> Config msg
withWidth width (Config config) =
    Config { config | width = Just width }


withMinWidth : String -> Config msg -> Config msg
withMinWidth minWidth (Config config) =
    Config { config | minWidth = Just minWidth }


withMaxWidth : String -> Config msg -> Config msg
withMaxWidth maxWidth (Config config) =
    Config { config | maxWidth = maxWidth }


withCustomClassList : List ( String, Bool ) -> Config msg -> Config msg
withCustomClassList customClassList (Config config) =
    Config
        { config
            | customClassList = customClassList
        }


withCustomStyles : List ( String, String ) -> Config msg -> Config msg
withCustomStyles customStyles (Config config) =
    Config
        { config
            | customStyles = customStyles
        }


withCustomAttributes : List (Html.Attribute msg) -> Config msg -> Config msg
withCustomAttributes customAttributes (Config config) =
    Config
        { config
            | customAttributes = customAttributes
        }


view : Config msg -> Html msg
view (Config config) =
    Radix.Modal.new
        { open = config.open
        , onClose = config.onClose
        , content =
            (case config.title of
                Nothing ->
                    Html.text ""

                Just title ->
                    Radix.Heading.new title
                        |> Radix.Heading.withSize 5
                        |> Radix.Heading.view
            )
                :: (case config.description of
                        [] ->
                            Html.text ""

                        nonEmptyDescription ->
                            Radix.Text.new nonEmptyDescription
                                |> Radix.Text.asParagraph
                                |> Radix.Text.withSize 2
                                |> Radix.Text.view
                   )
                :: config.body
        }
        |> (case config.size of
                Size1 ->
                    Radix.Modal.withSize1

                Size2 ->
                    Radix.Modal.withSize2

                Size3 ->
                    identity

                Size4 ->
                    Radix.Modal.withSize4
           )
        |> Radix.Internal.applyMaybe Radix.Modal.withWidth config.width
        |> Radix.Internal.applyMaybe Radix.Modal.withMinWidth config.minWidth
        |> Radix.Modal.withMaxWidth config.maxWidth
        |> Radix.Modal.withCustomClassList config.customClassList
        |> Radix.Modal.withCustomStyles config.customStyles
        |> Radix.Modal.withCustomAttributes config.customAttributes
        |> Radix.Modal.view
