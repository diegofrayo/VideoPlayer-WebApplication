<?php

namespace app\daos_mysql;

use app\entities\video;

interface IDaoApp {

	public function saveVideo(Video $video);
	public function deleteVideo($videoId);
	public function getCurrentPlaylist($userId);
	public function cleanPlaylist();
}