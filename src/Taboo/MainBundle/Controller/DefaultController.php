<?php

namespace Taboo\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('TabooMainBundle:Default:index.html.twig', array('name' => $name, 'name2' => 'hi'));
    }
}
