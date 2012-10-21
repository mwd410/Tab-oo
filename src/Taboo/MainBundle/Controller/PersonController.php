<?php

namespace Taboo\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PersonController extends Controller {
    
    public function createAction(Request $request) {
        
        if ($request->isMethod('POST')) {
            
            return new Response('Hello ', 200);             
        }
        
        return $this->render('TabooMainBundle:Person:create.html.twig');
    }
}
