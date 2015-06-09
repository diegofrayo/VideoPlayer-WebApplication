<?php

namespace app\entities;

class User
{
	private $id;
	private $email; 
	private $full_name;

	public function __construct ($id,$email,$full_name)
	{
		$this->$id = $id;
		$this->$email = $email; 
		$this->$full_name = $full_name;
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

        return $this;
    }

    /**
     * Gets the value of email.
     *
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Sets the value of email.
     *
     * @param mixed $email the email
     *
     * @return self
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Gets the value of full_name.
     *
     * @return mixed
     */
    public function getFull_name()
    {
        return $this->full_name;
    }

    /**
     * Sets the value of full_name.
     *
     * @param mixed $full_name the full_name
     *
     * @return self
     */
    public function setFull_name($full_name)
    {
        $this->full_name = $full_name;

        return $this;
    }
}