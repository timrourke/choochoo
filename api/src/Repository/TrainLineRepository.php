<?php

namespace App\Repository;

use App\Entity\TrainLine;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method TrainLine|null find($id, $lockMode = null, $lockVersion = null)
 * @method TrainLine|null findOneBy(array $criteria, array $orderBy = null)
 * @method TrainLine[]    findAll()
 * @method TrainLine[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TrainLineRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, TrainLine::class);
    }

//    /**
//     * @return TrainLine[] Returns an array of TrainLine objects
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
    public function findOneBySomeField($value): ?TrainLine
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
