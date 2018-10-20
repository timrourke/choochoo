<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TrainLineRunRepository")
 */
class TrainLineRun
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TrainLine", inversedBy="runs")
     * @ORM\JoinColumn(nullable=false)
     */
    private $trainLine;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TrainOperator", inversedBy="runs")
     * @ORM\JoinColumn(nullable=false)
     */
    private $operator;

    /**
     * @ORM\Column(type="datetimetz_immutable")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetimetz_immutable")
     */
    private $updatedAt;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getOperator(): ?TrainOperator
    {
        return $this->operator;
    }

    public function setOperator(?TrainOperator $operator): self
    {
        $this->operator = $operator;

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
}
