<?php

namespace Taboo\MainBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table()
 */
class Song {
               
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
    /**
    * @ORM\Column(type="string", length=100)
    */
    protected $artist;
    
    /**
    * @ORM\Column(type="string", length=100)
    */
    protected $title;
    
    /**
    * @ORM\Column(type="string", length=50)
    */
    protected $tabType;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $capoFret;
    
    /**
    * @ORM\OneToMany(targetEntity="String", mappedBy="song")
    */
    protected $strings;
    
    /**
    * @ORM\OneToMany(targetEntity="Measure", mappedBy="song")
    */
    protected $measures;
    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->strings = new \Doctrine\Common\Collections\ArrayCollection();
        $this->measures = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set artist
     *
     * @param string $artist
     * @return Song
     */
    public function setArtist($artist)
    {
        $this->artist = $artist;
    
        return $this;
    }

    /**
     * Get artist
     *
     * @return string 
     */
    public function getArtist()
    {
        return $this->artist;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Song
     */
    public function setTitle($title)
    {
        $this->title = $title;
    
        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set tabType
     *
     * @param string $tabType
     * @return Song
     */
    public function setTabType($tabType)
    {
        $this->tabType = $tabType;
    
        return $this;
    }

    /**
     * Get tabType
     *
     * @return string 
     */
    public function getTabType()
    {
        return $this->tabType;
    }

    /**
     * Set capoFret
     *
     * @param integer $capoFret
     * @return Song
     */
    public function setCapoFret($capoFret)
    {
        $this->capoFret = $capoFret;
    
        return $this;
    }

    /**
     * Get capoFret
     *
     * @return integer 
     */
    public function getCapoFret()
    {
        return $this->capoFret;
    }

    /**
     * Add strings
     *
     * @param Taboo\MainBundle\Entity\String $strings
     * @return Song
     */
    public function addString(\Taboo\MainBundle\Entity\String $strings)
    {
        $this->strings[] = $strings;
    
        return $this;
    }

    /**
     * Remove strings
     *
     * @param Taboo\MainBundle\Entity\String $strings
     */
    public function removeString(\Taboo\MainBundle\Entity\String $strings)
    {
        $this->strings->removeElement($strings);
    }

    /**
     * Get strings
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getStrings()
    {
        return $this->strings;
    }

    /**
     * Add measures
     *
     * @param Taboo\MainBundle\Entity\Measure $measures
     * @return Song
     */
    public function addMeasure(\Taboo\MainBundle\Entity\Measure $measures)
    {
        $this->measures[] = $measures;
    
        return $this;
    }

    /**
     * Remove measures
     *
     * @param Taboo\MainBundle\Entity\Measure $measures
     */
    public function removeMeasure(\Taboo\MainBundle\Entity\Measure $measures)
    {
        $this->measures->removeElement($measures);
    }

    /**
     * Get measures
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getMeasures()
    {
        return $this->measures;
    }
}