<?php

if (! function_exists('getModelNamespace')) {
    /**
     * get class namespace from a word
     * ex: workspace => App\\Models\\Workspace
     *
     * @param  string $model
     * @return string | null
     */
    function getModelNamespace(string $model): ?string
    {
        $class = "App\\Models\\" . ucfirst(strtolower($model));

        return class_exists($class) ? $class : null;
    }
}

if (! function_exists('getModel')) {
    /**
     * get a model instance from a type and id
     *
     * @param  string $model
     * @param int $id
     * @return Illuminate\Database\Eloquent\Model
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    function getModel(string $model, int $id): Illuminate\Database\Eloquent\Model
    {
        if (! $class = getModelNamespace($model)) {
            throw new \Illuminate\Database\Eloquent\ModelNotFoundException();
        }

        return $class::findOrFail($id);
    }
}

if (! function_exists('getModelPrefix')) {
    /**
     * get a model prefix
     * ex: workspace => w/
     *
     * @param  string $model
     * @return string
     */
    function getModelPrefix(string $model): string
    {
        return match ($model) {
            'workspace' => 'w/',
            'board' => 'b/',
            default => '',
        };
    }
}
