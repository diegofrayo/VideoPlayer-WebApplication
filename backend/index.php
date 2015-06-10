<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';

require 'app/api/API.php';

use app\api\API;

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

/**--------Cors--------**/
require_once 'Slim/Middleware/Cors.php';

 $corsOptions = array(
     "origin" => "*",
     "allowMethods" => array("POST", "GET")
 );

$cors = new \CorsSlim\CorsSlim($corsOptions);
$app->add($cors);
/**--------Cors--------**/

$app->get(
    '/getCurrentPlaylist',
    function () {
        $currentPlaylist = API::getCurrentPlaylist(1);
        echo json_encode($currentPlaylist);
    }
    );

$app->post(
    '/saveVideo',
    function () {
        $input = json_decode(file_get_contents("php://input"));
        echo json_encode(API::saveVideo($input->id, $input->title, 
            $input->duration, $input->channel_name,$input->playlist_id, 
            $input->picture_url, $input->youtube_video_id));
    }
    );

$app->post(
    '/deleteVideo',
    function () {
        $input = json_decode(file_get_contents("php://input"));
        API::deleteVideo($input->videoId);
        echo $input->videoId;
    }
    );

$app->post(
    '/cleanPlaylist',
    function () {
        API::cleanPlaylist();
        echo 'cleanPlaylist';
    }
    );



/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */

$app->run();
