<?php

namespace App\DataFixtures;

use App\Entity\TrainLine;
use App\Entity\TrainLineRoute;
use App\Entity\TrainLineRun;
use App\Entity\TrainOperator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    private const EL_ROUTE_NAMES = [
        'Blue Line',
        'Green Line',
        'Yellow Line',
        'Purple Line',
        'Orange Line',
        'Brown Line',
        'Red Line',
        'Pink Line',
    ];

    private const METRA_ROUTE_NAMES = [
        'BNSF Railway',
        'Heritage Corridor',
        'Metra Electric District',
        'Milwaukee District / North',
        'Milwaukee District / West',
        'North Central Service',
        'Rock Island District',
        'SouthWest Service',
        'Union Pacific / North',
        'Union Pacific / Northwest',
        'Union Pacific / West',
    ];

    private const AMTRAK_ROUTE_NAMES = [
        'Auto Train',
        'Capitol Limited',
        'City of New Orleans',
        'Downeaster',
        'Ethan Allen Express',
        'Hoosier State',
        'Lake Shore Limited',
        'Missouri River Runner',
        'Pennsylvanian',
        'Southwest Chief',
        'Vermonter',
        'Adirondack',
        'California Zephyr',
        'Cardinal',
        'Coast Starlight',
        'Empire Builder',
        'Heartland Flyer',
        'Illinois Service',
        'Maple Leaf',
        'Northeast Regional',
        'San Joaquins',
        'Sunset Limited',
        'Amtrak Cascades',
        'Capitol Corridor',
        'Carolinian / Piedmont',
        'Crescent',
        'Empire Service',
        'Hiawatha',
        'Keystone Service',
        'Michigan Services',
        'Pacific Surfliner',
        'Silver Service/Palmetto',
        'Texas Eagle',
    ];

    private const EL_OPERATORS = [
        ['first' => 'Michell', 'last' => 'Tiebe'],
        ['first' => 'Reade', 'last' => 'Burnyate'],
        ['first' => 'Liv', 'last' => 'Clayson'],
        ['first' => 'Shae', 'last' => 'Ree'],
        ['first' => 'Rycca', 'last' => 'Cram'],
        ['first' => 'Birgit', 'last' => 'Heindrich'],
        ['first' => 'Winfield', 'last' => 'Ciccerale'],
        ['first' => 'Audy', 'last' => 'Nestle'],
        ['first' => 'Nap', 'last' => 'Maletratt'],
        ['first' => 'Donelle', 'last' => 'Mocher'],
        ['first' => 'Fabiano', 'last' => 'Epp'],
        ['first' => 'Donny', 'last' => 'Cumberland'],
        ['first' => 'Arabelle', 'last' => 'Kidwell'],
        ['first' => 'Giraud', 'last' => 'Habden'],
        ['first' => 'Shaughn', 'last' => 'Gorick'],
        ['first' => 'Cornie', 'last' => 'Stockey'],
        ['first' => 'Horatius', 'last' => 'Ost'],
        ['first' => 'Christye', 'last' => 'Everett'],
        ['first' => 'Margret', 'last' => 'Soldan'],
        ['first' => 'Selene', 'last' => 'Scrafton'],
        ['first' => 'Winonah', 'last' => 'Pendock'],
    ];

    private const METRA_OPERATORS = [
        ['first' => 'Normand', 'last' => 'Ashplant'],
        ['first' => 'Shelly', 'last' => 'Pennini'],
        ['first' => 'Bronnie', 'last' => 'Kill'],
    ];

    private const AMTRAK_OPERATORS = [
        ['first' => 'Zaccaria', 'last' => 'McReynolds'],
        ['first' => 'Willetta', 'last' => 'Totaro'],
        ['first' => 'Pammi', 'last' => 'MacCracken'],
        ['first' => 'Pierrette', 'last' => 'Morten'],
        ['first' => 'Mahalia', 'last' => 'Daudray'],
        ['first' => 'Renaldo', 'last' => 'Smithend'],
        ['first' => 'Zenia', 'last' => 'Rany'],
        ['first' => 'Latrina', 'last' => 'Sherland'],
        ['first' => 'Salem', 'last' => 'Kaser'],
        ['first' => 'Jessalin', 'last' => 'Karchowski'],
        ['first' => 'Fritz', 'last' => 'Schonfeld'],
        ['first' => 'Petronilla', 'last' => 'McKomb'],
        ['first' => 'Alvis', 'last' => 'Sympson'],
        ['first' => 'Sloan', 'last' => 'Pilmer'],
        ['first' => 'Corny', 'last' => 'Scrogges'],
        ['first' => 'Sauveur', 'last' => 'Henighan'],
        ['first' => 'Ambrosio', 'last' => 'Wyche'],
        ['first' => 'Theadora', 'last' => 'Craddock'],
    ];

    public function load(ObjectManager $manager)
    {
        $now = new \DateTimeImmutable();

        $el = new TrainLine();
        $el->setName('El');
        $el->setUpdatedAt($now);
        $el->setCreatedAt($now);
        $manager->persist($el);

        $metra = new TrainLine();
        $metra->setName('Metra');
        $metra->setUpdatedAt($now);
        $metra->setCreatedAt($now);
        $manager->persist($metra);

        $amtrak = new TrainLine();
        $amtrak->setName('Amtrak');
        $amtrak->setUpdatedAt($now);
        $amtrak->setCreatedAt($now);
        $manager->persist($amtrak);

        $elRoutes = [];
        foreach (self::EL_ROUTE_NAMES as $routeName) {
            $route = new TrainLineRoute();
            $route->setTrainLine($el);
            $route->setName($routeName);
            $route->setCreatedAt($now);
            $route->setUpdatedAt($now);
            $manager->persist($route);
            $elRoutes[] = $route;
        }

        $metraRoutes = [];
        foreach (self::METRA_ROUTE_NAMES as $routeName) {
            $route = new TrainLineRoute();
            $route->setTrainLine($metra);
            $route->setName($routeName);
            $route->setCreatedAt($now);
            $route->setUpdatedAt($now);
            $manager->persist($route);
            $metraRoutes[] = $route;
        }

        $amtrakRoutes = [];
        foreach (self::AMTRAK_ROUTE_NAMES as $routeName) {
            $route = new TrainLineRoute();
            $route->setTrainLine($amtrak);
            $route->setName($routeName);
            $route->setCreatedAt($now);
            $route->setUpdatedAt($now);
            $manager->persist($route);
            $amtrakRoutes[] = $route;
        }

        $elOperators = [];
        foreach (self::EL_OPERATORS as $name) {
            $operator = new TrainOperator();
            $operator->setTrainLine($el);
            $operator->setFirstName($name['first']);
            $operator->setLastName($name['last']);
            $operator->setCreatedAt($now);
            $operator->setUpdatedAt($now);
            $manager->persist($operator);
            $elOperators[] = $operator;
        }

        $metraOperators = [];
        foreach (self::METRA_OPERATORS as $name) {
            $operator = new TrainOperator();
            $operator->setTrainLine($metra);
            $operator->setFirstName($name['first']);
            $operator->setLastName($name['last']);
            $operator->setCreatedAt($now);
            $operator->setUpdatedAt($now);
            $manager->persist($operator);
            $metraOperators[] = $operator;
        }

        $amtrakOperators = [];
        foreach (self::AMTRAK_OPERATORS as $name) {
            $operator = new TrainOperator();
            $operator->setTrainLine($amtrak);
            $operator->setFirstName($name['first']);
            $operator->setLastName($name['last']);
            $operator->setCreatedAt($now);
            $operator->setUpdatedAt($now);
            $manager->persist($operator);
            $amtrakOperators[] = $operator;
        }

        for ($i = 0; $i < mt_rand(10, 20); $i++) {
            $run = new TrainLineRun();
            $run->setTrainLine($el);
            $run->setOperator($elOperators[mt_rand(0, count($elOperators) - 1)]);
            $run->setTrainLineRoute($elRoutes[mt_rand(0, count($elRoutes) - 1)]);
            $run->setCreatedAt($now);
            $run->setUpdatedAt($now);
            $manager->persist($run);
        }

        for ($i = 0; $i < mt_rand(20, 30); $i++) {
            $run = new TrainLineRun();
            $run->setTrainLine($metra);
            $run->setOperator($metraOperators[mt_rand(0, count($metraOperators) - 1)]);
            $run->setTrainLineRoute($metraRoutes[mt_rand(0, count($metraRoutes) - 1)]);
            $run->setCreatedAt($now);
            $run->setUpdatedAt($now);
            $manager->persist($run);
        }

        for ($i = 0; $i < mt_rand(15, 20); $i++) {
            $run = new TrainLineRun();
            $run->setTrainLine($amtrak);
            $run->setOperator($amtrakOperators[mt_rand(0, count($amtrakOperators) - 1)]);
            $run->setTrainLineRoute($amtrakRoutes[mt_rand(0, count($amtrakRoutes) - 1)]);
            $run->setCreatedAt($now);
            $run->setUpdatedAt($now);
            $manager->persist($run);
        }

        $manager->flush();
    }
}
