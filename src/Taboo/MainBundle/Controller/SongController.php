<?php

namespace Taboo\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class SongController extends Controller {
    
    public function readAction() {
        
        return $this->render('TabooMainBundle:Song:index.html.twig');
    }
}