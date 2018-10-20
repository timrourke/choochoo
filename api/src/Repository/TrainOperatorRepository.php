<?php

namespace App\Repository;

use App\Entity\TrainOperator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method TrainOperator|null find($id, $lockMode = null, $lockVersion = null)
 * @method TrainOperator|null findOneBy(array $criteria, array $orderBy = null)
 * @method TrainOperator[]    findAll()
 * @method TrainOperator[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TrainOperatorRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, TrainOperator::class);
    }

//    /**
//     * @return TrainOperator[] Returns an array of TrainOperator objects
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
    public function findOneBySomeField($value): ?TrainOperator
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
