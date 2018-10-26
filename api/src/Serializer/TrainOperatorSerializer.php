<?php

declare(strict_types=1);

namespace App\Serializer;

use App\Entity\TrainOperator;

class TrainOperatorSerializer
{
    /**
     * @param \App\Entity\TrainOperator[] $operators
     * @return array
     */
    public static function serializeMany(array $operators): array
    {
        return array_map(function(TrainOperator $operator) {
            return self::serializeOne($operator);
        }, $operators);
    }

    public static function serializeOne(TrainOperator $operator): array
    {
        return [
            'id'        => $operator->getId(),
            'firstName' => $operator->getFirstName(),
            'lastName'  => $operator->getLastName(),
            'trainLine' => $operator->getTrainLine()->getId(),
        ];
    }
}