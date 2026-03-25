<?php

use App\Enums\Priority;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $priorities = DB::table('cards')->pluck('priority', 'id');

        Schema::table('cards', function (Blueprint $table) {
            $table->dropColumn('priority');
        });

        Schema::table('cards', function (Blueprint $table) {
            $table->enum('priority', Priority::values())->nullable();
        });

        foreach ($priorities as $id => $priority) {
            $value = $priority === 'Hight' ? Priority::HIGH : $priority;
            DB::table('cards')->where('id', $id)->update(['priority' => $value]);
        }
    }

    public function down(): void
    {
        $priorities = DB::table('cards')->pluck('priority', 'id');

        Schema::table('cards', function (Blueprint $table) {
            $table->dropColumn('priority');
        });

        Schema::table('cards', function (Blueprint $table) {
            $table->enum('priority', ['Normal', 'Medium', 'Hight', 'Urgent'])->nullable();
        });

        foreach ($priorities as $id => $priority) {
            $value = $priority === 'High' ? 'Hight' : $priority;
            DB::table('cards')->where('id', $id)->update(['priority' => $value]);
        }
    }
};
