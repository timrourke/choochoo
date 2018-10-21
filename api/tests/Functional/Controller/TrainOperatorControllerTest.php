<?php

declare(strict_types=1);

namespace App\Tests\Functional\Controller;

use App\Entity\TrainLine;
use App\Entity\TrainOperator;
use DateTimeImmutable;

class TrainOperatorControllerTest extends ControllerTestCase
{
    /**
     * @test
     * @throws \Exception
     */
    public function shouldGetOperators(): void
    {
        $this->createOperators();

        $this->client->request('GET', '/api/operators');

        $response = $this->client->getResponse();
        $responseData = json_decode($response->getContent(), true);

        $this->assertSame(200, $response->getStatusCode());

        $this->assertCount(
            6,
            $responseData['operators']
        );
    }

    /**
     * @test
     * @throws \Exception
     */
    public function shouldSortOperatorsByLastNameThenFirstName(): void
    {
        $this->createOperators();

        $this->client->request('GET', '/api/operators');

        $response = $this->client->getResponse();
        $responseData = json_decode($response->getContent(), true);

        $this->assertSame(
            'Arnette',
            $responseData['operators'][0]['lastName']
        );

        $this->assertSame(
            'DuBois',
            $responseData['operators'][1]['lastName']
        );

        $this->assertSame(
            'Leigh',
            $responseData['operators'][2]['lastName']
        );

        $this->assertSame(
            'Michaels',
            $responseData['operators'][3]['lastName']
        );

        $this->assertSame(
            'Michaels',
            $responseData['operators'][4]['lastName']
        );

        $this->assertSame(
            'Tong',
            $responseData['operators'][5]['lastName']
        );
    }

    /**
     * @test
     * @throws \Exception
     */
    public function shouldFilterOperatorsByName(): void
    {
        $this->createOperators();

        $this->client->request('GET', '/api/operators?name=michael');

        $response = $this->client->getResponse();
        $responseData = json_decode($response->getContent(), true);

        $this->assertCount(
            3,
            $responseData['operators']
        );

        $this->assertSame(
            'Michael',
            $responseData['operators'][0]['firstName']
        );

        $this->assertSame(
            'Michaels',
            $responseData['operators'][1]['lastName']
        );

        $this->assertSame(
            'Michaels',
            $responseData['operators'][2]['lastName']
        );
    }

    /**
     * @throws \Exception
     */
    private function createOperators(): void
    {
        $trainLine = $this->createTrainLine();

        foreach([
            ['Jimmy', 'Michaels'],
            ['Michael', 'Leigh'],
            ['Susan', 'DuBois'],
            ['Deborah', 'Michaels'],
            ['Karen', 'Arnette'],
            ['Xi', 'Tong'],
        ] as $name) {
            $operator = new TrainOperator();
            $operator->setFirstName($name[0]);
            $operator->setLastName($name[1]);
            $operator->setCreatedAt(new DateTimeImmutable());
            $operator->setUpdatedAt(new DateTimeImmutable());
            $operator->setTrainLine($trainLine);

            $this->entityManager->persist($operator);
            $this->entityManager->flush();
        }
    }

    /**
     * @return \App\Entity\TrainLine
     * @throws \Exception
     */
    private function createTrainLine(): TrainLine
    {
        $trainLine = new TrainLine();
        $trainLine->setName('unimportant');
        $trainLine->setCreatedAt(new DateTimeImmutable());
        $trainLine->setUpdatedAt(new DateTimeImmutable());

        $this->entityManager->persist($trainLine);
        $this->entityManager->flush();

        return $trainLine;
    }
}