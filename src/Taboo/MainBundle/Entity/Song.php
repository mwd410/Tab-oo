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
     * @ORM\Column(type="text")
     */
    protected $jsonSong;

    /**
    * @ORM\Column(type="string", length=50)
    */
    protected $tabType;
    
    /**
    * @ORM\Column(type="integer")
    */
    protected $capoFret;
    
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
    
    public function encode($recurseDepth = 0) {
        $song = array();
        
        $song["id"] = $this->getId();
        $song["artist"] = $this->getArtist();
        $song["title"] = $this->getTitle();
        $song["tabType"] = $this->getTabType();
        $song["capoFret"] = $this->getCapoFret();
        if (is_int($recurseDepth) && $recurseDepth > 0) {
            $strings = array();
            foreach ($this->getStrings() as $string) {
                $strings[] = $string->encode();
            }
            $song["strings"] = $strings;
            $measures = array();
            foreach ($this->getMeasures() as $measure) {
                $measures[] = $measure->encode($recurseDepth);
            }
            $song["measures"] = $measures;
        }
        
        return $song;
    }
    
    public function decode($song) {
        if (is_string($song)) {
            $song = json_decode($song);
        }
        
        $this->setArtist($song["artist"]);
        $this->setTitle($song["title"]);
        $this->setTabType($song["tabType"]);
        $this->setCapoFret($song["capoFret"]);
        
        if (!is_null($song["strings"])) {
            foreach ($song["strings"] as $jsonString) {
                foreach ($this->getStrings() as $string) {
                    if ($jsonString["id"] == $string->getId()) {
                        $string->decode($jsonString);
                        goto StopStrings;
                    }
                }
            }
        }
        StopStrings:
        
        if (!is_null($song("measures"))) {
            foreach ($song["measures"] as $jsonMeasure) {
                foreach ($this->getMeasures() as $measure) {
                    if ($jsonMeasure["id"] == $measure->getId()) {
                        $measure->decode($jsonMeasure);
                        goto StopMeasures;
                    }
                }
            }
        }
        StopMeasures:
        
        return $this;
    }

    /**
     * Set jsonSong
     *
     * @param string $jsonSong
     * @return Song
     */
    public function setJsonSong($jsonSong)
    {
        $this->jsonSong = $jsonSong;
    
        return $this;
    }

    /**
     * Get jsonSong
     *
     * @return string 
     */
    public function getJsonSong()
    {
        return $this->jsonSong;
    }
}