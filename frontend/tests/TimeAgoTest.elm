module TimeAgoTest exposing (suite)

import Expect
import Test exposing (Test)
import Time
import TimeAgo


now : Time.Posix
now =
    Time.millisToPosix 1700000000000


ago : Int -> Time.Posix
ago ms =
    Time.millisToPosix (1700000000000 - ms)


suite : Test
suite =
    Test.describe "TimeAgo"
        [ Test.describe "fromPosix"
            [ Test.test "seconds" <|
                \_ ->
                    TimeAgo.fromPosix now (ago 5000) |> Expect.equal "5 sec ago"
            , Test.test "minutes" <|
                \_ ->
                    TimeAgo.fromPosix now (ago (5 * 60 * 1000)) |> Expect.equal "5 min ago"
            , Test.test "hours" <|
                \_ ->
                    TimeAgo.fromPosix now (ago (5 * 3600 * 1000)) |> Expect.equal "5 hr ago"
            , Test.test "one day is singular" <|
                \_ ->
                    TimeAgo.fromPosix now (ago (86400 * 1000)) |> Expect.equal "1 day ago"
            , Test.test "days" <|
                \_ ->
                    TimeAgo.fromPosix now (ago (2 * 86400 * 1000)) |> Expect.equal "2 days ago"
            , Test.test "weeks" <|
                \_ ->
                    TimeAgo.fromPosix now (ago (14 * 86400 * 1000)) |> Expect.equal "2 weeks ago"
            , Test.test "months" <|
                \_ ->
                    TimeAgo.fromPosix now (ago (60 * 86400 * 1000)) |> Expect.equal "2 months ago"
            , Test.test "years" <|
                \_ ->
                    TimeAgo.fromPosix now (ago (800 * 86400 * 1000)) |> Expect.equal "2 yrs ago"
            , Test.test "a future timestamp is just now" <|
                \_ ->
                    TimeAgo.fromPosix now (Time.millisToPosix 1700000005000) |> Expect.equal "just now"
            ]
        , Test.describe "parseTimestamp"
            [ Test.test "epoch" <|
                \_ ->
                    TimeAgo.parseTimestamp "1970-01-01 00:00:00" |> Expect.equal (Just (Time.millisToPosix 0))
            , Test.test "a known date" <|
                \_ ->
                    TimeAgo.parseTimestamp "2000-01-01 00:00:00" |> Expect.equal (Just (Time.millisToPosix 946684800000))
            , Test.test "invalid input" <|
                \_ ->
                    TimeAgo.parseTimestamp "nope" |> Expect.equal Nothing
            ]
        , Test.describe "fromTimestamp"
            [ Test.test "relative to now" <|
                \_ ->
                    TimeAgo.fromTimestamp (Time.millisToPosix 10000) "1970-01-01 00:00:05" |> Expect.equal "5 sec ago"
            , Test.test "unparseable falls back to the raw string" <|
                \_ ->
                    TimeAgo.fromTimestamp now "nope" |> Expect.equal "nope"
            ]
        ]
