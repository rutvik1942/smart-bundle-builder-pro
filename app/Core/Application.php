<?php

namespace SmartBundleBuilder\Core;

class Application
{
    private static $instance = null;

    private Loader $loader;

    public static function boot()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
        $this->loader = new Loader();

        $plugin = new Plugin();

        $plugin->register($this->loader);

        $this->loader->run();
    }
}