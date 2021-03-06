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
     * @param string $id
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @Route("/{id}", methods={"GET"})
     */
    public function get($id)
    {
        $route = $this->repo->find($id);

        if (!$route) {
            return $this->json([
                'error' => sprintf('No route found with the ID %s', $id),
            ], 404);
        }

        return $this->json([
            'route' => $this->serializeRoute($route),
        ]);
    }

    /**
     * @param \App\Entity\TrainLineRoute[] $routes
     * @return array
     */
    private function serializeRoutes(array $routes): array
    {
        return array_map(function(TrainLineRoute $route) {
            return $this->serializeRoute($route);
        }, $routes);
    }

    private function serializeRoute(TrainLineRoute $route): array
    {
        return [
            'id'        => $route->getId(),
            'name'      => $route->getName(),
            'createdAt' => $route->getCreatedAt()->format(DateTime::ATOM),
            'updatedAt' => $route->getUpdatedAt()->format(DateTime::ATOM),
            'trainLine' => $route->getTrainLine()->getId(),
        ];
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
