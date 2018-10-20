<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181020212255 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf(
            $this->connection->getDatabasePlatform()->getName() !== 'mysql',
            'Migration can only be executed safely on \'mysql\'.'
        );

        $this->addSql('
            CREATE TABLE train_line (
                id INT AUTO_INCREMENT NOT NULL,
                name VARCHAR(255) NOT NULL,
                created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetimetz_immutable)\',
                updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetimetz_immutable)\',
                PRIMARY KEY(id)
            )
            DEFAULT CHARACTER SET utf8mb4
            COLLATE utf8mb4_unicode_ci
            ENGINE = InnoDB
        ');

        $this->addSql('
            CREATE TABLE train_operator (
                id INT AUTO_INCREMENT NOT NULL,
                train_line_id INT NOT NULL,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetimetz_immutable)\',
                updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetimetz_immutable)\',
                INDEX IDX_B0FFC60098ED2649 (train_line_id),
                PRIMARY KEY(id)
            )
            DEFAULT CHARACTER SET utf8mb4
            COLLATE utf8mb4_unicode_ci
            ENGINE = InnoDB
        ');

        $this->addSql('
            CREATE TABLE train_line_route (
                id INT AUTO_INCREMENT NOT NULL,
                train_line_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetimetz_immutable)\',
                updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetimetz_immutable)\',
                INDEX IDX_E56D986798ED2649 (train_line_id),
                PRIMARY KEY(id)
            )
            DEFAULT CHARACTER SET utf8mb4
            COLLATE utf8mb4_unicode_ci
            ENGINE = InnoDB
        ');

        $this->addSql('
            CREATE TABLE train_line_run (
                id INT AUTO_INCREMENT NOT NULL,
                train_line_id INT NOT NULL,
                operator_id INT NOT NULL,
                created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetimetz_immutable)\',
                updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetimetz_immutable)\',
                INDEX IDX_C464F61B98ED2649 (train_line_id),
                INDEX IDX_C464F61B251935C (operator_id),
                PRIMARY KEY(id)
            )
            DEFAULT CHARACTER SET utf8mb4
            COLLATE utf8mb4_unicode_ci
            ENGINE = InnoDB
        ');

        $this->addSql('
            ALTER TABLE train_operator
            ADD CONSTRAINT FK_B0FFC60098ED2649
            FOREIGN KEY (train_line_id)
            REFERENCES train_line (id)
        ');

        $this->addSql('
            ALTER TABLE train_line_route
            ADD CONSTRAINT FK_E56D986798ED2649
            FOREIGN KEY (train_line_id)
            REFERENCES train_line (id)
        ');

        $this->addSql('
            ALTER TABLE train_line_run
            ADD CONSTRAINT FK_C464F61B98ED2649
            FOREIGN KEY (train_line_id)
            REFERENCES train_line (id)
        ');

        $this->addSql('
            ALTER TABLE train_line_run
            ADD CONSTRAINT FK_C464F61B251935C
            FOREIGN KEY (operator_id)
            REFERENCES train_operator (id)
        ');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf(
            $this->connection->getDatabasePlatform()->getName() !== 'mysql',
            'Migration can only be executed safely on \'mysql\'.'
        );

        $this->addSql('ALTER TABLE train_operator DROP FOREIGN KEY FK_B0FFC60098ED2649');
        $this->addSql('ALTER TABLE train_line_route DROP FOREIGN KEY FK_E56D986798ED2649');
        $this->addSql('ALTER TABLE train_line_run DROP FOREIGN KEY FK_C464F61B98ED2649');
        $this->addSql('ALTER TABLE train_line_run DROP FOREIGN KEY FK_C464F61B251935C');
        $this->addSql('DROP TABLE train_line');
        $this->addSql('DROP TABLE train_operator');
        $this->addSql('DROP TABLE train_line_route');
        $this->addSql('DROP TABLE train_line_run');
    }
}
