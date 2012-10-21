<?php

namespace Taboo\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MainController extends Controller {
    
    public function indexAction() {
        
        return $this->render('TabooMainBundle:Main:index.html.twig', array('name2' => 'hi'));
    }
}
