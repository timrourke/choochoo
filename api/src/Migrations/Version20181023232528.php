<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181023232528 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE train_operator RENAME INDEX idx_b0ffc60098ed2649 TO IDX_B0FFC600C95038D9');
        $this->addSql('ALTER TABLE train_line_route RENAME INDEX idx_e56d986798ed2649 TO IDX_E56D9867C95038D9');
        $this->addSql('ALTER TABLE train_line_run ADD train_line_route_id INT NOT NULL');
        $this->addSql('ALTER TABLE train_line_run ADD CONSTRAINT FK_C464F61BA1420587 FOREIGN KEY (train_line_route_id) REFERENCES train_line_route (id)');
        $this->addSql('CREATE INDEX IDX_C464F61BA1420587 ON train_line_run (train_line_route_id)');
        $this->addSql('ALTER TABLE train_line_run RENAME INDEX idx_c464f61b98ed2649 TO IDX_C464F61BC95038D9');
        $this->addSql('ALTER TABLE train_line_run RENAME INDEX idx_c464f61b251935c TO IDX_C464F61B584598A3');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE train_line_route RENAME INDEX idx_e56d9867c95038d9 TO IDX_E56D986798ED2649');
        $this->addSql('ALTER TABLE train_line_run DROP FOREIGN KEY FK_C464F61BA1420587');
        $this->addSql('DROP INDEX IDX_C464F61BA1420587 ON train_line_run');
        $this->addSql('ALTER TABLE train_line_run DROP train_line_route_id');
        $this->addSql('ALTER TABLE train_line_run RENAME INDEX idx_c464f61bc95038d9 TO IDX_C464F61B98ED2649');
        $this->addSql('ALTER TABLE train_line_run RENAME INDEX idx_c464f61b584598a3 TO IDX_C464F61B251935C');
        $this->addSql('ALTER TABLE train_operator RENAME INDEX idx_b0ffc600c95038d9 TO IDX_B0FFC60098ED2649');
    }
}
