<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TrainLineRouteRepository")
 */
class TrainLineRoute
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
     * @ORM\ManyToOne(targetEntity="App\Entity\TrainLine", inversedBy="routes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $trainLine;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\TrainLineRun", mappedBy="trainLineRoute", orphanRemoval=false)
     */
    private $trainLineRuns;

    public function __construct()
    {
        $this->trainLineRuns = new ArrayCollection();
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

    public function getTrainLine(): ?TrainLine
    {
        return $this->trainLine;
    }

    public function setTrainLine(?TrainLine $trainLine): self
    {
        $this->trainLine = $trainLine;

        return $this;
    }

    /**
     * @return Collection|TrainLineRun[]
     */
    public function getTrainLineRuns(): Collection
    {
        return $this->trainLineRuns;
    }

    public function addTrainLineRun(TrainLineRun $trainLineRun): self
    {
        if (!$this->trainLineRuns->contains($trainLineRun)) {
            $this->trainLineRuns[] = $trainLineRun;
            $trainLineRun->setTrainLineRoute($this);
        }

        return $this;
    }

    public function removeTrainLineRun(TrainLineRun $trainLineRun): self
    {
        if ($this->trainLineRuns->contains($trainLineRun)) {
            $this->trainLineRuns->removeElement($trainLineRun);
            // set the owning side to null (unless already changed)
            if ($trainLineRun->getTrainLineRoute() === $this) {
                $trainLineRun->setTrainLineRoute(null);
            }
        }

        return $this;
    }
}
