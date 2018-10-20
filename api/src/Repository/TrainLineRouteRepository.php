<?php

namespace App\Repository;

use App\Entity\TrainLineRoute;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method TrainLineRoute|null find($id, $lockMode = null, $lockVersion = null)
 * @method TrainLineRoute|null findOneBy(array $criteria, array $orderBy = null)
 * @method TrainLineRoute[]    findAll()
 * @method TrainLineRoute[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TrainLineRouteRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, TrainLineRoute::class);
    }

//    /**
//     * @return TrainLineRoute[] Returns an array of TrainLineRoute objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TrainLineRoute
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
