<?php

namespace app\daos_mysql;

require_once 'IDaoApp.php';
require_once '/../database/BDFactory.php';

use app\entities\video;
use app\database\BDFactory;

class DaoApp implements IDaoApp
{

    public function saveVideo(Video $video)
    {
        $manejadorBD = BDFactory::crearManejadorBD();
        $consultaSQL = "insert into video (id, title, duration, channel_name, playlist_id, picture_url, youtube_video_id) values (?,?,?,?,?,?,?)";

        $arrayDatos = array(
            $video->getId(),
            $video->getTitle(),
            $video->getDuration(),
            $video->getChannelName(),
            $video->getPlaylistId(),
            $video->getPictureUrl(),
            $video->getYoutubeVideoId(),
            );

        $resultados = $manejadorBD->insertar($consultaSQL, $arrayDatos);

        if ($resultados != null) {
 
            $video->setId($resultados['id_last_video']);
            return $video->toJson();
        }
        
        return null;
    }

    public function deleteVideo($videoId){

        $manejadorBD = BDFactory::crearManejadorBD();
        $consultaSQL = "delete from video where id = ?";
        $exitoConsulta = $manejadorBD->eliminar($consultaSQL, array($videoId));
        
        if ($exitoConsulta == true) {

            return true;
        }
        
        return null;
    }

    public function getCurrentPlaylist($userId){

        $manejadorBD = BDFactory::crearManejadorBD();
        $consultaSQL = "select video.* from playlist, video where playlist.user_id = ? and playlist.name = ?";
        $resultados = $manejadorBD->obtenerDatos($consultaSQL, array($userId, 'Default List'));
        $numeroResultados = count($resultados);
        $listaVideos = array();
        
        if ($numeroResultados != 0) {

            for ($i = 0; $i < $numeroResultados; $i++) {

                $nuevaVideos = $resultados[$i];

                $objectJSON = array(
                    "id" => $nuevaVideos['id'],
                    "title" => $nuevaVideos['title'],
                    "duration"=> $nuevaVideos['duration'],
                    "channel_name" => $nuevaVideos['channel_name'],
                    "playlist_id"=> $nuevaVideos['playlist_id'],
                    "picture_url"=> $nuevaVideos['picture_url'],
                    "youtube_video_id"=> $nuevaVideos['youtube_video_id'],
                    );

                $listaVideos[] = $objectJSON;
            }
        }
        
        return $listaVideos;
    }

    public function cleanPlaylist(){

        $manejadorBD = BDFactory::crearManejadorBD();
        $consultaSQL = "delete from video where playlist_id = ?";
        $exitoConsulta = $manejadorBD->eliminar($consultaSQL, array(1));
        
        if ($exitoConsulta == true) {

            return true;
        }
        
        return null;
    }

}
