<?php

namespace app\api;

require dirname(__FILE__).'/../daos_mysql/DaoApp.php';

use app\entities\Video;
use app\daos_mysql\DaoApp;

class API {

	public static function saveVideo($id, $title, $duration, $channelName, $pictureUrl, $sourceId)
	{
		$video = new Video($id, $title, $duration, $channelName, $pictureUrl, $sourceId);
		$daoApp = new DaoApp();
		return $daoApp->saveVideo($video);
	}

	public static function deleteVideo($videoId)
	{
		$daoApp = new DaoApp();
		return $daoApp->deleteVideo($videoId);
	}

	public static function getCurrentPlaylist()
	{
		$daoApp = new DaoApp();
		return $daoApp->getCurrentPlaylist();
	}

	public static function cleanPlaylist()
	{
		$daoApp = new DaoApp();
		return $daoApp->cleanPlaylist();
	}
}