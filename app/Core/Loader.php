<?php

namespace SmartBundleBuilder\Core;

class Loader
{
    private array $actions = [];

    public function addAction(
        string $hook,
        object $component,
        string $callback,
        int $priority = 10,
        int $acceptedArgs = 1
    ): void {

        $this->actions[] = compact(
            'hook',
            'component',
            'callback',
            'priority',
            'acceptedArgs'
        );

    }

    public function run(): void
    {
        foreach ($this->actions as $action) {

            add_action(
                $action['hook'],
                [$action['component'], $action['callback']],
                $action['priority'],
                $action['acceptedArgs']
            );

        }
    }
}