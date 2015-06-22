<?php

namespace app\entities;

class Video
{
	private $id;
	private $title;
	private $duration;
	private $channelName;
	private $pictureUrl;
	private $sourceId;

	public function __construct ($id, $title, $duration, $channelName, $pictureUrl, $sourceId)
	{
		$this->id = $id;
		$this->title = $title;
		$this->duration = $duration;
		$this->channelName = $channelName;
		$this->pictureUrl = $pictureUrl;
		$this->sourceId = $sourceId;
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
     * Gets the value of sourceId.
     *
     * @return mixed
     */
    public function getSourceId()
    {
    	return $this->sourceId;
    }

    /**
     * Sets the value of sourceId.
     *
     * @param mixed $sourceId the youtube video id
     *
     * @return self
     */
    public function setSourceId($sourceId)
    {
    	$this->sourceId = $sourceId;
    }

    public function toJson()
    {
        $objectJSON = array(
            "id" => $this->getId(),
            "title" => $this->getTitle(),
            "duration"=> $this->getDuration(),
            "channel_name" => $this->getChannelName(),
            "picture_url"=> $this->getPictureUrl(),
            "source_id"=> $this->getSourceId()
            );

        return $objectJSON;
    }
}