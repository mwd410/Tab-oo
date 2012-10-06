<?php
namespace Taboo\MainBundle\Entity;

use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table()
 */
class Person implements UserInterface {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
    /**
    * @ORM\Column(type="string", length=255, unique=true)
    */
    protected $username;
    
    /**
    * @ORM\Column(type="string", length=255)
    */
    protected $password;
    
    /**
    * @ORM\Column(type="string", length=255)
    */
    protected $salt;
    
    public function setId($id) {
        $this->id = $id;
        return $this;
    }
    
    public function getId() {
        return $this->id;
    }
    
    public function setPassword($password) {
        $this->password = $password;
        return $this;
    }
    
    public function getPassword() {
        return $this->password;
    }
    
    public function setSalt($salt) {
        $this->salt = $salt;
        return $this;
    }
    
    public function getSalt() {
        return $this->salt;
    }
    
    public function setUsername($username) {
        $this->username = $username;
        return $this;
    }
    
    public function getUsername() {
        return $this->username;
    }
    
    public function getRoles() {
        return array("ROLE_USER");
    }
    
    public function eraseCredentials() {
    
    }
}