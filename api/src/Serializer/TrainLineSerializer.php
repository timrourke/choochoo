<?php

declare(strict_types=1);

namespace App\Serializer;

use App\Entity\TrainLine;
use DateTime;

class TrainLineSerializer
{
    /**
     * @param \App\Entity\TrainLine[] $trainLines
     * @return array
     */
    public static function serializeMany(array $trainLines): array
    {
        return array_map(function(TrainLine $line) {
            return self::serializeOne($line);
        }, $trainLines);
    }

    public static function serializeOne(TrainLine $line): array
    {
        return [
            'id'        => $line->getId(),
            'name'      => $line->getName(),
            'createdAt' => $line->getCreatedAt()->format(DateTime::ATOM),
            'updatedAt' => $line->getUpdatedAt()->format(DateTime::ATOM),
        ];
    }
}