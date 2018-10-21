<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\TrainLineRun;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method TrainLineRun|null find($id, $lockMode = null, $lockVersion = null)
 * @method TrainLineRun|null findOneBy(array $criteria, array $orderBy = null)
 * @method TrainLineRun[]    findAll()
 * @method TrainLineRun[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TrainLineRunRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, TrainLineRun::class);
    }

//    /**
//     * @return TrainLineRun[] Returns an array of TrainLineRun objects
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
    public function findOneBySomeField($value): ?TrainLineRun
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
