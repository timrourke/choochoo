<?php

namespace App\Controller;

use App\Entity\TrainLineRun;
use App\Repository\TrainLineRepository;
use App\Repository\TrainLineRouteRepository;
use App\Repository\TrainLineRunRepository;
use App\Repository\TrainOperatorRepository;
use DateTime;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class TrainLineRunController
 * @package App\Controller
 * @Route("/api/runs", name="run_")
 */
class TrainLineRunController extends AbstractController
{
    private const SORT_ASC                  = 'ASC';
    private const SORT_DESC                 = 'DESC';
    private const SORT_TRAIN_LINE_NAME      = 'trainLineName';
    private const SORT_ROUTE_NAME           = 'routeName';
    private const SORT_RUN_NUMBER           = 'runNumber';
    private const SORT_OPERATOR_COMPOUND_ID = 'operatorCompoundId';

    private $operatorRepo;
    private $repo;
    private $routeRepo;
    private $trainLineRepo;

    public function __construct(
        TrainLineRunRepository $repo,
        TrainLineRepository $trainLineRepo,
        TrainLineRouteRepository $routeRepo,
        TrainOperatorRepository $operatorRepo
    ) {
        $this->repo = $repo;
        $this->trainLineRepo = $trainLineRepo;
        $this->routeRepo = $routeRepo;
        $this->operatorRepo = $operatorRepo;
    }

    /**
     * @Route("", methods={"GET"})
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function index(Request $request)
    {
        $qb = $this->buildQuery()->setMaxResults(5);

        $offset = (int) $request->get('offset') ?? 0;

        $total = $this->getTotal();

        $this->paginateQuery($qb, $offset);

        $this->sortQuery(
            $qb,
            $request->get('sortOrder') ?? '',
            $request->get('sortDirection') ?? ''
        );

        $runs = $qb->getQuery()->getResult();

        return $this->json([
            'runs' => $this->serializeRuns($runs),
            'meta' => [
                'limit' => 5,
                'offset' => $offset,
                'total' => $total,
            ],
        ]);
    }

    /**
     * @Route("", methods={"POST"})
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @throws \Exception
     */
    public function create(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $newTrainLineRun = new TrainLineRun();

        $trainLine = $this->trainLineRepo->find($data['run']['trainLine']);
        $route = $this->routeRepo->find($data['run']['route']);
        $operator = $this->operatorRepo->find($data['run']['operator']);

        $newTrainLineRun->setTrainLine($trainLine);
        $newTrainLineRun->setTrainLineRoute($route);
        $newTrainLineRun->setOperator($operator);
        $newTrainLineRun->setCreatedAt(new \DateTimeImmutable());
        $newTrainLineRun->setUpdatedAt(new \DateTimeImmutable());

        $em = $this->getDoctrine()->getManager();
        $em->persist($newTrainLineRun);
        $em->flush();

        $qb = $this->buildQuery();

        $qb->andWhere(
            $qb->expr()->eq('t.id', $newTrainLineRun->getId())
        )->setMaxResults(1);

        $run = $qb->getQuery()->getResult();

        return $this->json([
            'run' => $this->serializeRun($run[0]),
        ], 201);
    }

    /**
     * @param $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @Route("/{id}", methods={"DELETE"})
     */
    public function delete($id)
    {
        $trainLineRun = $this->repo->find($id);

        if ($trainLineRun) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($trainLineRun);
            $em->flush();
        }

        return $this->json(new \stdClass(), 204);
    }

    private function buildQuery(): QueryBuilder
    {
        $qb = $this->repo->createQueryBuilder('t');
        $qb->select([
            't',
            'partial train_line.{id,name}',
            'partial route.{id,name}',
            'partial operator.{id,firstName,lastName}',
            'CONCAT(
                SUBSTRING(train_line.name, 1, 1),
                LPAD(t.id, 3, \'0\')
            ) AS run_number',
            'CONCAT(
                SUBSTRING(operator.firstName, 1, 1),
                operator.lastName
            ) AS operator_compound_id'
        ])
            ->innerJoin(
                't.trainLine',
                'train_line'
            )
            ->innerJoin(
                't.trainLineRoute',
                'route'
            )
            ->innerJoin(
                't.operator',
                'operator'
            );

        return $qb;
    }

    private function getTotal(): int
    {
        $totalResult = $this->repo->createQueryBuilder('t')
            ->select('COUNT(t.id)')
            ->getQuery()
            ->getResult();

        $total = (int) current($totalResult[0]);

        return $total;
    }

    private function paginateQuery(QueryBuilder $qb, int $offset): void
    {
        $qb->setFirstResult($offset);
    }

    private function sortQuery(
        QueryBuilder $qb,
        string $sortOrder = 'runNumber',
        string $sortDirection = 'asc'
    ): void {
        $normalizedDirection = $this->normalizeSortDirection($sortDirection);

        switch (trim($sortOrder)) {
            case self::SORT_TRAIN_LINE_NAME:
                $sortField = 'train_line.name';
                break;
            case self::SORT_ROUTE_NAME:
                $sortField = 'route.name';
                break;
            case self::SORT_RUN_NUMBER:
                $sortField = 'run_number';
                break;
            case self::SORT_OPERATOR_COMPOUND_ID:
                $sortField = 'operator_compound_id';
                break;
            default:
                $sortField = 'run_number';
                break;
        }

        $qb->orderBy($sortField, $normalizedDirection);
    }

    private function normalizeSortDirection(string $sortDirection): string
    {
        if (empty(trim($sortDirection))) {
            return self::SORT_ASC;
        }

        $sortDirectionToUpper = strtoupper(trim($sortDirection));

        switch ($sortDirectionToUpper) {
            case self::SORT_ASC:
                return self::SORT_ASC;
            case self::SORT_DESC:
                return self::SORT_DESC;
            default:
                return self::SORT_ASC;
        }
    }

    private function serializeRuns(array $results): array
    {
        return array_map(function(array $result) {
            return $this->serializeRun($result);
        }, $results);
    }

    private function serializeRun(array $result): array
    {
        /**
         * @var TrainLineRun $run
         */
        $run = $result[0];

        return [
            'id'                 => $run->getId(),
            'line'               => $run->getTrainLine()->getId(),
            'operator'           => $run->getOperator()->getId(),
            'route'              => $run->getTrainLineRoute()->getId(),
            'createdAt'          => $run->getCreatedAt()->format(DateTime::ATOM),
            'updatedAt'          => $run->getUpdatedAt()->format(DateTime::ATOM),
            'trainLineName'      => $run->getTrainLine()->getName(),
            'routeName'          => $run->getTrainLineRoute()->getName(),
            'runNumber'          => $result['run_number'],
            'operatorCompoundId' => $result['operator_compound_id'],
        ];
    }
}
