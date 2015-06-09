<?php

namespace app\entities;

class Video
{
	private $id;
	private $title; 
	private $duration;
	private $channelName;
	private $playlistId;
	private $pictureUrl;
	private $youtubeVideoId;

	public function __construct ($id, $title, $duration, $channelName, $playlistId, $pictureUrl, $youtubeVideoId)
	{
		$this->id = $id;
		$this->title = $title; 
		$this->duration = $duration;
		$this->channelName = $channelName;
		$this->playlistId = $playlistId;
		$this->pictureUrl = $pictureUrl;
		$this->youtubeVideoId = $youtubeVideoId;
	}

    /**
     * Gets the value of id.
     *
     * @return mixed
     */
    public function getId()
    {
    	return $this->id;
    }

    /**
     * Sets the value of id.
     *
     * @param mixed $id the id
     *
     * @return self
     */
    public function setId($id)
    {
    	$this->id = $id;
    }

    /**
     * Gets the value of title.
     *
     * @return mixed
     */
    public function getTitle()
    {
    	return $this->title;
    }

    /**
     * Sets the value of title.
     *
     * @param mixed $title the title
     *
     * @return self
     */
    public function setTitle($title)
    {
    	$this->title = $title;
    }

    /**
     * Gets the value of duration.
     *
     * @return mixed
     */
    public function getDuration()
    {
    	return $this->duration;
    }

    /**
     * Sets the value of duration.
     *
     * @param mixed $duration the duration
     *
     * @return self
     */
    public function setDuration($duration)
    {
    	$this->duration = $duration;
    }

    /**
     * Gets the value of channelName.
     *
     * @return mixed
     */
    public function getChannelName()
    {
    	return $this->channelName;
    }

    /**
     * Sets the value of channelName.
     *
     * @param mixed $channelName the channel name
     *
     * @return self
     */
    public function setChannelName($channelName)
    {
    	$this->channelName = $channelName;
    }

    /**
     * Gets the value of playlistId.
     *
     * @return mixed
     */
    public function getPlaylistId()
    {
    	return $this->playlistId;
    }

    /**
     * Sets the value of playlistId.
     *
     * @param mixed $playlistId the playlist id
     *
     * @return self
     */
    public function setPlaylistId($playlistId)
    {
    	$this->playlistId = $playlistId;
    }

    /**
     * Gets the value of pictureUrl.
     *
     * @return mixed
     */
    public function getPictureUrl()
    {
    	return $this->pictureUrl;
    }

    /**
     * Sets the value of pictureUrl.
     *
     * @param mixed $pictureUrl the picture url
     *
     * @return self
     */
    public function setPictureUrl($pictureUrl)
    {
    	$this->pictureUrl = $pictureUrl;
    }

    /**
     * Gets the value of youtubeVideoId.
     *
     * @return mixed
     */
    public function getYoutubeVideoId()
    {
    	return $this->youtubeVideoId;
    }

    /**
     * Sets the value of youtubeVideoId.
     *
     * @param mixed $youtubeVideoId the youtube video id
     *
     * @return self
     */
    public function setYoutubeVideoId($youtubeVideoId)
    {
    	$this->youtubeVideoId = $youtubeVideoId;
    }

    public function toJson()
    {
        $objectJSON = array(
            "id" => $this->getId(),
            "title" => $this->getTitle(),
            "duration"=> $this->getDuration(),
            "channel_name" => $this->getChannelName(),
            "playlist_id"=> $this->getPlaylistId(),
            "picture_url"=> $this->getPictureUrl(),
            "youtube_video_id"=> $this->getYoutubeVideoId() );

        return $objectJSON;
    }
}