module Tests exposing (suite)

import Api
import Expect
import Fuzz
import Test exposing (Test)


suite : Test
suite =
    Test.describe "Api.queryString"
        [ Test.test "empty params produce no query string" <|
            \_ ->
                Api.queryString []
                    |> Expect.equal ""
        , Test.test "single param is prefixed with ?" <|
            \_ ->
                Api.queryString [ ( "a", "b" ) ]
                    |> Expect.equal "?a=b"
        , Test.test "multiple params are joined with &" <|
            \_ ->
                Api.queryString [ ( "a", "b" ), ( "c", "d" ) ]
                    |> Expect.equal "?a=b&c=d"
        , Test.test "keys and values are percent-encoded" <|
            \_ ->
                Api.queryString [ ( "order_by", "NAME ASC" ) ]
                    |> Expect.equal "?order_by=NAME%20ASC"
        , Test.fuzz Fuzz.string "values never contain raw spaces" <|
            \value ->
                Api.queryString [ ( "q", value ) ]
                    |> String.contains " "
                    |> Expect.equal False
        ]
