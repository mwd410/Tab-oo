<?php

namespace Taboo\MainBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table()
 */
class Note {
               
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
    /**
    * @ORM\ManyToOne(targetEntity="Measure", inversedBy="notes")
    */
    protected $measure;
    
    /**
    * @ORM\ManyToOne(targetEntity="String", inversedBy="notes")
    */
    protected $string;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $subdivision;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $position;
    
    /**
    * @ORM\Column(type="float")
    */
    protected $absolutePosition;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $length;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $fret;
    
    /**
    * @ORM\Column(type="boolean")
    */
    protected $tieStart;
    
    /**
    * @ORM\Column(type="boolean")
    */
    protected $tieEnd;
    
    /**
    * @ORM\Column(type="boolean")
    */
    protected $hammerOn;
    
    /**
    * @ORM\Column(type="boolean")
    */
    protected $pullOff;
    
    /**
    * @ORM\Column(type="boolean")
    */
    protected $mute;
    
    

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
     * Set subdivision
     *
     * @param integer $subdivision
     * @return Note
     */
    public function setSubdivision($subdivision)
    {
        $this->subdivision = $subdivision;
    
        return $this;
    }

    /**
     * Get subdivision
     *
     * @return integer 
     */
    public function getSubdivision()
    {
        return $this->subdivision;
    }

    /**
     * Set position
     *
     * @param integer $position
     * @return Note
     */
    public function setPosition($position)
    {
        $this->position = $position;
    
        return $this;
    }

    /**
     * Get position
     *
     * @return integer 
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * Set absolutePosition
     *
     * @param float $absolutePosition
     * @return Note
     */
    public function setAbsolutePosition($absolutePosition)
    {
        $this->absolutePosition = $absolutePosition;
    
        return $this;
    }

    /**
     * Get absolutePosition
     *
     * @return float 
     */
    public function getAbsolutePosition()
    {
        return $this->absolutePosition;
    }

    /**
     * Set length
     *
     * @param integer $length
     * @return Note
     */
    public function setLength($length)
    {
        $this->length = $length;
    
        return $this;
    }

    /**
     * Get length
     *
     * @return integer 
     */
    public function getLength()
    {
        return $this->length;
    }

    /**
     * Set fret
     *
     * @param integer $fret
     * @return Note
     */
    public function setFret($fret)
    {
        $this->fret = $fret;
    
        return $this;
    }

    /**
     * Get fret
     *
     * @return integer 
     */
    public function getFret()
    {
        return $this->fret;
    }

    /**
     * Set tieStart
     *
     * @param boolean $tieStart
     * @return Note
     */
    public function setTieStart($tieStart)
    {
        $this->tieStart = $tieStart;
    
        return $this;
    }

    /**
     * Get tieStart
     *
     * @return boolean 
     */
    public function getTieStart()
    {
        return $this->tieStart;
    }

    /**
     * Set tieEnd
     *
     * @param boolean $tieEnd
     * @return Note
     */
    public function setTieEnd($tieEnd)
    {
        $this->tieEnd = $tieEnd;
    
        return $this;
    }

    /**
     * Get tieEnd
     *
     * @return boolean 
     */
    public function getTieEnd()
    {
        return $this->tieEnd;
    }

    /**
     * Set hammerOn
     *
     * @param boolean $hammerOn
     * @return Note
     */
    public function setHammerOn($hammerOn)
    {
        $this->hammerOn = $hammerOn;
    
        return $this;
    }

    /**
     * Get hammerOn
     *
     * @return boolean 
     */
    public function getHammerOn()
    {
        return $this->hammerOn;
    }

    /**
     * Set pullOff
     *
     * @param boolean $pullOff
     * @return Note
     */
    public function setPullOff($pullOff)
    {
        $this->pullOff = $pullOff;
    
        return $this;
    }

    /**
     * Get pullOff
     *
     * @return boolean 
     */
    public function getPullOff()
    {
        return $this->pullOff;
    }

    /**
     * Set mute
     *
     * @param boolean $mute
     * @return Note
     */
    public function setMute($mute)
    {
        $this->mute = $mute;
    
        return $this;
    }

    /**
     * Get mute
     *
     * @return boolean 
     */
    public function getMute()
    {
        return $this->mute;
    }

    /**
     * Set measure
     *
     * @param Taboo\MainBundle\Entity\Measure $measure
     * @return Note
     */
    public function setMeasure(\Taboo\MainBundle\Entity\Measure $measure = null)
    {
        $this->measure = $measure;
    
        return $this;
    }

    /**
     * Get measure
     *
     * @return Taboo\MainBundle\Entity\Measure 
     */
    public function getMeasure()
    {
        return $this->measure;
    }

    /**
     * Set string
     *
     * @param Taboo\MainBundle\Entity\String $string
     * @return Note
     */
    public function setString(\Taboo\MainBundle\Entity\String $string = null)
    {
        $this->string = $string;
    
        return $this;
    }

    /**
     * Get string
     *
     * @return Taboo\MainBundle\Entity\String 
     */
    public function getString()
    {
        return $this->string;
    }
    
    public function encode() {
        $note = array();
        
        $note["id"] = $this->getId();
        $note["measureId"] = $this->getMeasure()->getId();
        $note["stringId"] = $this->getString()->getId();
        $note["subdivision"] = $this->getSubdivision();
        $note["position"] = $this->getPosition();
        $note["absolutePosition"] = $this->getAbsolutePosition();
        $note["length"] = $this->getLength();
        $note["fret"] = $this->getFret();
        $note["tieStart"] = $this->getTieStart();
        $note["tieEnd"] = $this->getTieEnd();
        $note["hammerOn"] = $this->getHammerOn();
        $note["pullOff"] = $this->getPullOff();
        $note["mute"] = $this->getMute();
        
        return $note;
    }
    
    public function decode($note) {
        if (is_string(note)) {
            $note = json_decode($note);
        }
        
        
    }
}