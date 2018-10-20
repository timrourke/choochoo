<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class TrainLineController
 * @package App\Controller
 * @Route("/api/trainLines", name="train_line_")
 */
class TrainLineController extends AbstractController
{
    public function __construct()
    {
    }

    /**
     * @Route("", methods={"GET"})
     */
    public function index()
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/TrainLineController.php',
        ]);
    }
}
