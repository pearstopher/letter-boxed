<?php
/*
this script pulls the current Letter Boxed puzzle from the NYT,
    parses it to get the current day's letters,
    and returns the list of letters {letters: [A,B,C...]}
*/

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// Set the time for expiration
$expirationTime = strtotime('tomorrow midnight');

// Calculate the expiration date
$expirationDate = date('D, d M Y H:i:s', $expirationTime) . ' GMT';

// Set the headers
header('Cache-Control: max-age=' . ($expirationTime - time()));
header('Expires: ' . $expirationDate);


$url = "https://www.nytimes.com/puzzles/letter-boxed";

// Initialize cURL session
$ch = curl_init();

// Set the cURL options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the cURL request and retrieve the response
$response = curl_exec($ch);

// Check if there was an error
if(curl_error($ch)) {
    echo json_encode(["error" => curl_error($ch)]);
} else {
    if (preg_match('/"sides":\["(.*?)\"\]/', $response, $matches)) {
        $sidesValue = $matches[1];
        $sidesArray = explode('","', $sidesValue);

        $flattenedArray = str_split(implode("", $sidesArray));

        // switch the letters around because my program fills them clockwise
        $temp = $flattenedArray[6];
        $flattenedArray[6] = $flattenedArray[8];
        $flattenedArray[8] = $temp;

        $temp = $flattenedArray[9];
        $flattenedArray[9] = $flattenedArray[11];
        $flattenedArray[11] = $temp;

        $jsonArray = json_encode(["letters" => $flattenedArray]);

        echo $jsonArray;

    } else {
        echo json_encode(["error" => "Letters not found."]);
    }
}


// Close cURL session
curl_close($ch);
?>