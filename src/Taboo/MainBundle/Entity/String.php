<?php

namespace Taboo\MainBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table()
 */
class String {
               
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
    /**
    * @ORM\ManyToOne(targetEntity="Song", inversedBy="strings")
    */
    protected $song;
    
    /**
    * @ORM\OneToMany(targetEntity="Note", mappedBy="string")
    */
    protected $notes;
    
    /**
    * @ORM\Column(type="float")
    */
    protected $hz;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $octave;
    
    /**
    * @ORM\Column(type="string", length=2)
    */
    protected $note;
    
    /**
    * @ORM\Column(type="string", length=50)
    */
    protected $type;  
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->notes = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set hz
     *
     * @param float $hz
     * @return String
     */
    public function setHz($hz)
    {
        $this->hz = $hz;
    
        return $this;
    }

    /**
     * Get hz
     *
     * @return float 
     */
    public function getHz()
    {
        return $this->hz;
    }

    /**
     * Set octave
     *
     * @param integer $octave
     * @return String
     */
    public function setOctave($octave)
    {
        $this->octave = $octave;
    
        return $this;
    }

    /**
     * Get octave
     *
     * @return integer 
     */
    public function getOctave()
    {
        return $this->octave;
    }

    /**
     * Set note
     *
     * @param string $note
     * @return String
     */
    public function setNote($note)
    {
        $this->note = $note;
    
        return $this;
    }

    /**
     * Get note
     *
     * @return string 
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set type
     *
     * @param string $type
     * @return String
     */
    public function setType($type)
    {
        $this->type = $type;
    
        return $this;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set song
     *
     * @param Taboo\MainBundle\Entity\Song $song
     * @return String
     */
    public function setSong(\Taboo\MainBundle\Entity\Song $song = null)
    {
        $this->song = $song;
    
        return $this;
    }

    /**
     * Get song
     *
     * @return Taboo\MainBundle\Entity\Song 
     */
    public function getSong()
    {
        return $this->song;
    }

    /**
     * Add notes
     *
     * @param Taboo\MainBundle\Entity\Note $notes
     * @return String
     */
    public function addNote(\Taboo\MainBundle\Entity\Note $notes)
    {
        $this->notes[] = $notes;
    
        return $this;
    }

    /**
     * Remove notes
     *
     * @param Taboo\MainBundle\Entity\Note $notes
     */
    public function removeNote(\Taboo\MainBundle\Entity\Note $notes)
    {
        $this->notes->removeElement($notes);
    }

    /**
     * Get notes
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getNotes()
    {
        return $this->notes;
    }
    
    public function encode() {
        $string = array();
        
        $string["id"] = $this->getId();
        $string["songId"] = $this->getSong()->getId();
        $string["hz"] = $this->getHz();
        $string["note"] = $this->getNote();
        $string["octave"] = $this->getOctave();
        $string["type"] = $this->getType();
        
        return $string;
    }
    
    public function decode($string) {
        if (is_string($string)) {
            $string = json_decode($string);
        }
        
        $this->setHz($string["hz"]);
        $this->setNote($string["note"]);
        $this->setOctave($string["octave"]);
        $this->setType($string["type"]);
        
        return $this;
    }
}