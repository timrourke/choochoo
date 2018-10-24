<?php

namespace App\Controller;

use App\Entity\TrainLineRoute;
use App\Repository\TrainLineRouteRepository;
use DateTime;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class TrainLineRouteController
 * @package App\Controller
 * @Route("/api/routes", name="route_")
 */
class TrainLineRouteController extends AbstractController
{
    private $repo;

    public function __construct(TrainLineRouteRepository $repo)
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
            ->orderBy('t.name', 'ASC')
            ->setMaxResults(20);

        $this->filterByName($qb, $request->get('name') ?? '');

        $this->filterByTrainLine($qb, $request->get('trainLine') ?? '');

        $routes = $qb->getQuery()->getResult();

        return $this->json([
            'routes' => $this->serializeRoutes($routes),
        ]);
    }

    /**
     * @param \App\Entity\TrainLineRoute[] $routes
     * @return array
     */
    private function serializeRoutes(array $routes): array
    {
        return array_map(function(TrainLineRoute $route) {
            return [
                'id'        => $route->getId(),
                'name'      => $route->getName(),
                'createdAt' => $route->getCreatedAt()->format(DateTime::ATOM),
                'updatedAt' => $route->getUpdatedAt()->format(DateTime::ATOM),
                'trainLine' => $route->getTrainLine()->getId(),
            ];
        }, $routes);
    }

    private function filterByTrainLine(QueryBuilder $qb, string $trainLine = ''): void
    {
        if (empty($trainLine)) {
            return;
        }

        $qb->where(
            $qb->expr()->eq('t.trainLine', ':trainLine')
        )->setParameter('trainLine', $trainLine);
    }

    private function filterByName(QueryBuilder $qb, string $name = ''): void
    {
        if (empty($name)) {
            return;
        }

        $qb->where(
            $qb->expr()->like('t.name', ':name')
        )->setParameter('name', '%' . $name . '%');
    }
}
