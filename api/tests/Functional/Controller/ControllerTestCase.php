<?php

declare(strict_types=1);

namespace App\Tests\Functional\Controller;

use Doctrine\DBAL\Connection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ControllerTestCase extends WebTestCase
{
    /**
     * @var \Symfony\Bundle\FrameworkBundle\Client
     */
    protected $client;

    /**
     * @var \Doctrine\DBAL\Connection
     */
    protected $connection;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    protected function setUp()
    {
        parent::setUp();

        $this->client = static::createClient();

        $this->connection = static::$container->get(Connection::class);

        $this->entityManager = static::$container->get(EntityManagerInterface::class);

        $this->connection->beginTransaction();
    }

    /**
     * @throws \Doctrine\DBAL\ConnectionException
     */
    protected function tearDown()
    {
        $this->connection->rollBack();

        parent::tearDown();
    }
}
