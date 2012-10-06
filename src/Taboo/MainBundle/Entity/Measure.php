<?php

namespace Taboo\MainBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table()
 */
class Measure {
               
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $measureNumber;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $tempoSubdivision;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $subdivisionPerMinute;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $timeSubdivision;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $subdivisionPerMeasure;
    
    /**
    * ManyToOne(targetEntity="Song", inversedBy="measures")
    */
    protected $song;
    
    /**
    * @ORM\OneToMany(targetEntity="Note", mappedBy="measure")
    */
    protected $notes;
    
    
    
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
     * Set measureNumber
     *
     * @param integer $measureNumber
     * @return Measure
     */
    public function setMeasureNumber($measureNumber)
    {
        $this->measureNumber = $measureNumber;
    
        return $this;
    }

    /**
     * Get measureNumber
     *
     * @return integer 
     */
    public function getMeasureNumber()
    {
        return $this->measureNumber;
    }

    /**
     * Set tempoSubdivision
     *
     * @param integer $tempoSubdivision
     * @return Measure
     */
    public function setTempoSubdivision($tempoSubdivision)
    {
        $this->tempoSubdivision = $tempoSubdivision;
    
        return $this;
    }

    /**
     * Get tempoSubdivision
     *
     * @return integer 
     */
    public function getTempoSubdivision()
    {
        return $this->tempoSubdivision;
    }

    /**
     * Set subdivisionPerMinute
     *
     * @param integer $subdivisionPerMinute
     * @return Measure
     */
    public function setSubdivisionPerMinute($subdivisionPerMinute)
    {
        $this->subdivisionPerMinute = $subdivisionPerMinute;
    
        return $this;
    }

    /**
     * Get subdivisionPerMinute
     *
     * @return integer 
     */
    public function getSubdivisionPerMinute()
    {
        return $this->subdivisionPerMinute;
    }

    /**
     * Set timeSubdivision
     *
     * @param integer $timeSubdivision
     * @return Measure
     */
    public function setTimeSubdivision($timeSubdivision)
    {
        $this->timeSubdivision = $timeSubdivision;
    
        return $this;
    }

    /**
     * Get timeSubdivision
     *
     * @return integer 
     */
    public function getTimeSubdivision()
    {
        return $this->timeSubdivision;
    }

    /**
     * Set subdivisionPerMeasure
     *
     * @param integer $subdivisionPerMeasure
     * @return Measure
     */
    public function setSubdivisionPerMeasure($subdivisionPerMeasure)
    {
        $this->subdivisionPerMeasure = $subdivisionPerMeasure;
    
        return $this;
    }

    /**
     * Get subdivisionPerMeasure
     *
     * @return integer 
     */
    public function getSubdivisionPerMeasure()
    {
        return $this->subdivisionPerMeasure;
    }

    /**
     * Add notes
     *
     * @param Taboo\MainBundle\Entity\Note $notes
     * @return Measure
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
}