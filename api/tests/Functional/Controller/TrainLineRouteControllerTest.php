<?php

declare(strict_types=1);

namespace App\Tests\Functional\Controller;

use App\Entity\TrainLine;
use App\Entity\TrainLineRoute;
use DateTimeImmutable;

class TrainLineRouteControllerTest extends ControllerTestCase
{
    /**
     * @test
     * @throws \Exception
     */
    public function shouldGetRoutes(): void
    {
        $this->createRoutes();

        $this->client->request('GET', '/api/routes');

        $response = $this->client->getResponse();
        $responseData = json_decode($response->getContent(), true);

        $this->assertSame(200, $response->getStatusCode());

        $this->assertCount(
            3,
            $responseData['routes']
        );
    }

    /**
     * @test
     * @throws \Exception
     */
    public function shouldOrderRoutesByName(): void
    {
        $this->createRoutes();

        $this->client->request('GET', '/api/routes');

        $response = $this->client->getResponse();
        $responseData = json_decode($response->getContent(), true);

        $this->assertSame(
            'line one route one',
            $responseData['routes'][0]['name']
        );

        $this->assertSame(
            'line one route two',
            $responseData['routes'][1]['name']
        );

        $this->assertSame(
            'line two route one',
            $responseData['routes'][2]['name']
        );
    }

    /**
     * @test
     * @throws \Exception
     */
    public function shouldFilterRoutesByTrainLine(): void
    {
        $this->createRoutes();

        $this->client->request('GET', '/api/routes?trainLine=2');

        $response = $this->client->getResponse();
        $responseData = json_decode($response->getContent(), true);

        $this->assertCount(
            1,
            $responseData['routes']
        );

        $this->assertSame(
            'line two route one',
            $responseData['routes'][0]['name']
        );
    }

    /**
     * @throws \Exception
     */
    private function createRoutes(): void
    {
        $trainLines = $this->createTrainLines();

        $route1 = new TrainLineRoute();
        $route1->setName('line one route one');
        $route1->setCreatedAt(new DateTimeImmutable());
        $route1->setUpdatedAt(new DateTimeImmutable());
        $route1->setTrainLine($trainLines[0]);

        $this->entityManager->persist($route1);

        $route2 = new TrainLineRoute();
        $route2->setName('line one route two');
        $route2->setCreatedAt(new DateTimeImmutable());
        $route2->setUpdatedAt(new DateTimeImmutable());
        $route2->setTrainLine($trainLines[0]);

        $this->entityManager->persist($route2);

        $route3 = new TrainLineRoute();
        $route3->setName('line two route one');
        $route3->setCreatedAt(new DateTimeImmutable());
        $route3->setUpdatedAt(new DateTimeImmutable());
        $route3->setTrainLine($trainLines[1]);

        $this->entityManager->persist($route3);

        $this->entityManager->flush();
    }

    /**
     * @return \App\Entity\TrainLine[]
     * @throws \Exception
     */
    private function createTrainLines(): array
    {
        $trainLine1 = new TrainLine();
        $trainLine1->setName('one');
        $trainLine1->setCreatedAt(new DateTimeImmutable());
        $trainLine1->setUpdatedAt(new DateTimeImmutable());

        $this->entityManager->persist($trainLine1);

        $trainLine2 = new TrainLine();
        $trainLine2->setName('two');
        $trainLine2->setCreatedAt(new DateTimeImmutable());
        $trainLine2->setUpdatedAt(new DateTimeImmutable());

        $this->entityManager->persist($trainLine2);

        $this->entityManager->flush();

        return [$trainLine1, $trainLine2];
    }
}
