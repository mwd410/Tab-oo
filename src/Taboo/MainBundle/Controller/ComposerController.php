<?php
  
namespace Taboo\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ComposerController extends Controller {

    public function baseAction() {
        return $this->render("TabooMainBundle:Composer:base.html.twig");
    }

}