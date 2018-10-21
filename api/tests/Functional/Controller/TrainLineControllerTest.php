<?php

declare(strict_types=1);

namespace App\Tests\Functional\Controller;

use App\Entity\TrainLine;

class TrainLineControllerTest extends ControllerTestCase
{
    /**
     * @test
     * @throws \Exception
     */
    public function shouldGetFirstFiveTrainLines()
    {
        $this->createNTrainLines(5);

        $this->client->request('GET', '/api/trainLines');

        $response = $this->client->getResponse();
        $responseJson = json_decode($response->getContent(), true);

        $this->assertSame(200, $response->getStatusCode());

        $this->assertCount(
            5,
            $responseJson['trainLines']
        );
    }

    /**
     * @param int $numTrainLines
     * @return TrainLine[]
     * @throws \Exception
     */
    private function createNTrainLines(int $numTrainLines): array
    {
        $trainLines = [];

        for ($i = 0; $i < $numTrainLines; $i++) {
            $trainLine = new TrainLine();
            $trainLine->setName('Train Line ' . ($i + 1));
            $trainLine->setCreatedAt(new \DateTimeImmutable());
            $trainLine->setUpdatedAt(new \DateTimeImmutable());

            $this->entityManager->persist($trainLine);
            $this->entityManager->flush();

            $trainLines[] = $trainLine;
        }

        return $trainLines;
    }
}
