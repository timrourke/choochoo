<?php

declare(strict_types=1);

namespace App\Tests\Functional;

use PHPUnit\Framework\TestListener;
use PHPUnit\Framework\TestListenerDefaultImplementation;
use PHPUnit\Framework\TestSuite;
use Symfony\Component\Process\Process;

class MigrationsTestsListener implements TestListener
{
    use TestListenerDefaultImplementation;

    public function startTestSuite(TestSuite $suite)
    {
        if ('functional' !== $suite->getName()) {
            return;
        }

        $dropDb = new Process('bin/console doctrine:database:drop --if-exists --no-interaction --force');
        $dropDb->mustRun();

        $createDb = new Process('bin/console doctrine:database:create --if-not-exists --no-interaction');
        $createDb->mustRun();

        $migrateDb = new Process('bin/console doctrine:migrations:migrate --no-interaction');
        $migrateDb->mustRun();
    }
}
