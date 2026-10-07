module TimeAgo exposing (fromPosix, fromTimestamp, parseTimestamp)

import Time


{-| Format `then` relative to `now` as "5 sec ago", "2 days ago", etc.
Future timestamps read as "just now".
-}
fromPosix : Time.Posix -> Time.Posix -> String
fromPosix now then_ =
    let
        ms =
            Time.posixToMillis now - Time.posixToMillis then_
    in
    if ms < 1000 then
        "just now"

    else
        let
            seconds =
                ms // 1000
        in
        if seconds < 60 then
            fixed seconds "sec"

        else
            let
                minutes =
                    seconds // 60
            in
            if minutes < 60 then
                fixed minutes "min"

            else
                let
                    hours =
                        minutes // 60
                in
                if hours < 24 then
                    fixed hours "hr"

                else
                    let
                        days =
                            hours // 24
                    in
                    if days < 7 then
                        plural days "day"

                    else if days < 30 then
                        plural (days // 7) "week"

                    else if days < 365 then
                        plural (days // 30) "month"

                    else
                        plural (days // 365) "yr"


{-| Like `fromPosix`, but takes a "YYYY-MM-DD HH:MM:SS" (UTC) timestamp. Falls
back to the original string when it cannot be parsed.
-}
fromTimestamp : Time.Posix -> String -> String
fromTimestamp now stamp =
    case parseTimestamp stamp of
        Just then_ ->
            fromPosix now then_

        Nothing ->
            stamp


fixed : Int -> String -> String
fixed n unit =
    String.fromInt n ++ " " ++ unit ++ " ago"


plural : Int -> String -> String
plural n unit =
    String.fromInt n ++ " " ++ unit ++ suffix n ++ " ago"


suffix : Int -> String
suffix n =
    if n == 1 then
        ""

    else
        "s"


parseTimestamp : String -> Maybe Time.Posix
parseTimestamp stamp =
    case String.split " " (String.trim stamp) of
        [ date, clock ] ->
            Maybe.map2
                (\days ( h, m, s ) -> Time.millisToPosix ((days * 86400 + h * 3600 + m * 60 + s) * 1000))
                (parseDate date)
                (parseClock clock)

        _ ->
            Nothing


parseDate : String -> Maybe Int
parseDate date =
    let
        parts =
            String.split "-" date
    in
    case ( List.length parts, List.filterMap String.toInt parts ) of
        ( 3, [ y, mo, d ] ) ->
            Just (daysFromCivil y mo d)

        _ ->
            Nothing


parseClock : String -> Maybe ( Int, Int, Int )
parseClock clock =
    let
        parts =
            String.split ":" clock
    in
    case ( List.length parts, List.filterMap String.toInt parts ) of
        ( 3, [ h, m, s ] ) ->
            Just ( h, m, s )

        _ ->
            Nothing


daysFromCivil : Int -> Int -> Int -> Int
daysFromCivil y m d =
    let
        y2 =
            if m <= 2 then
                y - 1

            else
                y

        era =
            (if y2 >= 0 then y2 else y2 - 399) // 400

        yoe =
            y2 - era * 400

        doy =
            (153 * (if m > 2 then m - 3 else m + 9) + 2) // 5 + d - 1

        doe =
            yoe * 365 + yoe // 4 - yoe // 100 + doy
    in
    era * 146097 + doe - 719468
