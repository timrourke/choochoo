<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\TrainLineRepository;
use App\Repository\TrainOperatorRepository;
use App\Serializer\TrainLineSerializer;
use App\Serializer\TrainOperatorSerializer;
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

    /**
     * @var \App\Repository\TrainOperatorRepository
     */
    private $operatorRepo;

    public function __construct(
        TrainLineRepository $repo,
        TrainOperatorRepository $operatorRepo
    ) {
        $this->repo = $repo;
        $this->operatorRepo = $operatorRepo;
    }

    /**
     * @Route("", methods={"GET"})
     */
    public function index()
    {
        $trainLines = $this->repo->findAll();

        return $this->json([
            'trainLines' => TrainLineSerializer::serializeMany($trainLines),
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
            'trainLine' => TrainLineSerializer::serializeOne($trainLine),
        ]);
    }

    /**
     * @param $id
     * @Route("/{id}/stats", methods={"GET"})
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getStats($id) {
        $trainLine = $this->repo->find($id);

        if (!$trainLine) {
            return $this->json([
                'error' => sprintf('No train line found with the ID %s', $id),
            ], 404);
        }

        $qb = $this->operatorRepo->createQueryBuilder('t');

        $qb->select([
                't',
                'line',
                'COUNT(run.id) AS operator_num_runs'
            ])
            ->innerJoin('t.runs', 'run')
            ->innerJoin('t.trainLine', 'line')
            ->groupBy('t.id')
            ->where(
                $qb->expr()->eq('t.trainLine', ':id')
            )
            ->setParameter('id', $trainLine->getId());

        $results = $qb->getQuery()->getResult();

        if (!count($results)) {
            return $this->json([
                'trainLine' => [],
                'trainLineStats' => [],
            ]);
        }

        /**
         * @var \App\Entity\TrainLine $trainLine
         */
        $trainLine = $results[0][0]->getTrainLine();

        return $this->json([
            'trainLine' => TrainLineSerializer::serializeOne($trainLine),
            'trainLineStats' => $this->serializeStats($results),
        ]);
    }

    private function serializeStats(array $stats): array
    {
        return array_map(function(array $statsResult) {
            return [
                'trainLineName' => $statsResult[0]->getTrainLine()->getName(),
                'trainLineId' => $statsResult[0]->getTrainLine()->getId(),
                'numRuns' => (int) $statsResult['operator_num_runs'],
                'operator' => TrainOperatorSerializer::serializeOne($statsResult[0]),
            ];
        }, $stats);
    }
}
