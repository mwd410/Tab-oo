<?php

namespace Taboo\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DashboardController extends Controller {
    
    public function indexAction() {
        
        return $this->render('TabooMainBundle:Dashboard:index.html.twig');
    }
}