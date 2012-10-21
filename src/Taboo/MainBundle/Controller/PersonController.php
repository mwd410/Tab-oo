<?php

namespace Taboo\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PersonController extends Controller {
    
    public function createAction() {
        
        
        
        return $this->render('TabooMainBundle:Person:create.html.twig');
    }
}
