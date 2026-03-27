<?php

namespace App\Console\Commands;

use Database\Seeders\DemoDatabaseSeeder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class DemoResetCommand extends Command
{
    protected $signature = 'demo:reset {--force : Do not ask for confirmation}';

    protected $description = 'Run migrate:fresh and seed the demo database (destructive).';

    public function handle(): int
    {
        if (! $this->option('force') && ! $this->confirm('This will destroy all data in the database. Continue?')) {
            return self::FAILURE;
        }

        Artisan::call('migrate:fresh', [
            '--force' => true,
            '--seeder' => DemoDatabaseSeeder::class,
        ]);
        $this->output->write(Artisan::output());

        return self::SUCCESS;
    }
}
