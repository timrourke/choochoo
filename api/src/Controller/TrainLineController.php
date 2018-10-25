<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\TrainLine;
use App\Repository\TrainLineRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class TrainLineController
 * @package App\Controller
 * @Route("/api/trainLines", name="train_line_")
 */
class TrainLineController extends AbstractController
{
    /**
     * @var \App\Repository\TrainLineRepository
     */
    private $repo;

    public function __construct(TrainLineRepository $repo)
    {
        $this->repo = $repo;
    }

    /**
     * @Route("", methods={"GET"})
     */
    public function index()
    {
        $trainLines = $this->repo->findAll();

        return $this->json([
            'trainLines' => $this->serializeTrainLines($trainLines),
        ]);
    }

    /**
     * @param string $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @Route("/{id}", methods={"GET"})
     */
    public function get($id)
    {
        $trainLine = $this->repo->find($id);

        if (!$trainLine) {
            return $this->json([
                'error' => sprintf('No train line found with the ID %s', $id),
            ], 404);
        }

        return $this->json([
            'trainLine' => $this->serializeTrainLine($trainLine),
        ]);
    }

    /**
     * @param \App\Entity\TrainLine[] $trainLines
     * @return array
     */
    private function serializeTrainLines(array $trainLines): array
    {
        return array_map(function(TrainLine $line) {
            return $this->serializeTrainLine($line);
        }, $trainLines);
    }

    private function serializeTrainLine(TrainLine $line): array
    {
        return [
            'id'        => $line->getId(),
            'name'      => $line->getName(),
            'createdAt' => $line->getCreatedAt()->format(DateTime::ATOM),
            'updatedAt' => $line->getUpdatedAt()->format(DateTime::ATOM),
        ];
    }
}
