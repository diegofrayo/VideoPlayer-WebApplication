<?php

namespace app\daos_mysql;

require_once 'IDaoApp.php';
require_once dirname(__FILE__).'/../database/BDFactory.php';

use app\entities\video;
use app\database\BDFactory;

class DaoApp implements IDaoApp
{

    public function saveVideo(Video $video)
    {
        $manejadorBD = BDFactory::crearManejadorBD();
        $consultaSQL = "insert into song (title, duration, channel_name, picture_url, youtube_video_id) values (?,?,?,?,?)";

        $arrayDatos = array(
            $video->getTitle(),
            $video->getDuration(),
            $video->getChannelName(),
            $video->getPictureUrl(),
            $video->getSourceId()
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
        $consultaSQL = "delete from song where id = ?";
        $exitoConsulta = $manejadorBD->eliminar($consultaSQL, array($videoId));

        if ($exitoConsulta == true) {

            return true;
        }

        return null;
    }

    public function getCurrentPlaylist(){

        $manejadorBD = BDFactory::crearManejadorBD();
        $consultaSQL = "select * from song";
        $resultados = $manejadorBD->obtenerDatos($consultaSQL, array());
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
                    "picture_url"=> $nuevaVideos['picture_url'],
                    "source_id"=> $nuevaVideos['source_id']
                    );

                $listaVideos[] = $objectJSON;
            }
        }

        return $listaVideos;
    }

    public function cleanPlaylist(){

        $manejadorBD = BDFactory::crearManejadorBD();
        $consultaSQL = "delete from song";
        $exitoConsulta = $manejadorBD->eliminar($consultaSQL, array());

        if ($exitoConsulta == true) {
            return true;
        }

        return null;
    }

}
