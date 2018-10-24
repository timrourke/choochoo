<?php

namespace App\Controller;

use App\Entity\TrainLineRun;
use App\Repository\TrainLineRunRepository;
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

    private $repo;

    public function __construct(TrainLineRunRepository $repo)
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
            )
            ->setMaxResults(5);

        $this->sortQuery(
            $qb,
            $request->get('sortOrder') ?? '',
            $request->get('sortDirection') ?? ''
        );

        $runs = $qb->getQuery()->getResult();

        return $this->json([
            'runs' => $this->serializeRuns($runs),
        ]);
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

    /**
     * @param array $results
     * @return array
     */
    private function serializeRuns(array $results): array
    {
        return array_map(function(array $result) {
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
        }, $results);
    }
}
