<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TrainLineRepository")
 */
class TrainLine
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="datetimetz_immutable")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetimetz_immutable")
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\TrainLineRoute", mappedBy="trainLineId", orphanRemoval=true)
     */
    private $routes;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\TrainOperator", mappedBy="trainLineId", orphanRemoval=true)
     */
    private $operators;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\TrainLineRun", mappedBy="trainLineId", orphanRemoval=false)
     */
    private $runs;

    public function __construct()
    {
        $this->routes = new ArrayCollection();
        $this->operators = new ArrayCollection();
        $this->runs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection|TrainLineRoute[]
     */
    public function getRoutes(): Collection
    {
        return $this->routes;
    }

    public function addRoute(TrainLineRoute $route): self
    {
        if (!$this->routes->contains($route)) {
            $this->routes[] = $route;
            $route->setTrainLine($this);
        }

        return $this;
    }

    public function removeRoute(TrainLineRoute $route): self
    {
        if ($this->routes->contains($route)) {
            $this->routes->removeElement($route);
            // set the owning side to null (unless already changed)
            if ($route->getTrainLine() === $this) {
                $route->setTrainLine(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|TrainOperator[]
     */
    public function getOperators(): Collection
    {
        return $this->operators;
    }

    public function addOperator(TrainOperator $operator): self
    {
        if (!$this->operators->contains($operator)) {
            $this->operators[] = $operator;
            $operator->setTrainLine($this);
        }

        return $this;
    }

    public function removeOperator(TrainOperator $operator): self
    {
        if ($this->operators->contains($operator)) {
            $this->operators->removeElement($operator);
            // set the owning side to null (unless already changed)
            if ($operator->getTrainLine() === $this) {
                $operator->setTrainLine(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|TrainLineRun[]
     */
    public function getRuns(): Collection
    {
        return $this->runs;
    }

    public function addRun(TrainLineRun $run): self
    {
        if (!$this->runs->contains($run)) {
            $this->runs[] = $run;
            $run->setTrainLine($this);
        }

        return $this;
    }

    public function removeRun(TrainLineRun $run): self
    {
        if ($this->runs->contains($run)) {
            $this->runs->removeElement($run);
            // set the owning side to null (unless already changed)
            if ($run->getTrainLine() === $this) {
                $run->setTrainLine(null);
            }
        }

        return $this;
    }
}
