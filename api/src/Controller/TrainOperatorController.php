<?php

namespace App\Controller;

use App\Repository\TrainOperatorRepository;
use App\Serializer\TrainOperatorSerializer;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class TrainOperatorController
 * @package App\Controller
 * @Route("/api/operators", name="operator_")
 */
class TrainOperatorController extends AbstractController
{
    private $repo;

    public function __construct(TrainOperatorRepository $repo)
    {
        $this->repo = $repo;
    }

    /**
     * @Route("", methods={"GET"})
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function index(Request $request)
    {
        $qb = $this->repo->createQueryBuilder('t');
        $qb->select(['t'])
            ->orderBy('t.lastName', 'ASC')
            ->addOrderBy('t.firstName', 'ASC')
            ->setMaxResults(20);

        $this->filterByName($qb, $request->get('name') ?? '');

        $this->filterByTrainLine($qb, $request->get('trainLine') ?? '');

        $operators = $qb->getQuery()->getResult();

        return $this->json([
            'operators' => TrainOperatorSerializer::serializeMany($operators),
        ]);
    }

    /**
     * @param string $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @Route("/{id}", methods={"GET"})
     */
    public function get($id)
    {
        $operator = $this->repo->find($id);

        if (!$operator) {
            return $this->json([
                'error' => sprintf('No operator found with the ID %s', $id),
            ], 404);
        }

        return $this->json([
            'operator' => TrainOperatorSerializer::serializeOne($operator),
        ]);
    }


    private function filterByName(QueryBuilder $qb, string $name = ''): void
    {
        if (empty($name)) {
            return;
        }

        $qb->where(
            $qb->expr()->orX(
                $qb->expr()->like('t.firstName', ':name'),
                $qb->expr()->like('t.lastName', ':name')
            )
        )->setParameter('name', '%' . $name . '%');
    }

    private function filterByTrainLine(QueryBuilder $qb, string $trainLine = ''): void
    {
        if (empty($trainLine)) {
            return;
        }

        $qb->andWhere(
            $qb->expr()->eq('t.trainLine', ':trainLine')
        )->setParameter('trainLine', $trainLine);
    }
}
