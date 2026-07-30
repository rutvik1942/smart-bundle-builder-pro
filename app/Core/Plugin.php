<?php

namespace SmartBundleBuilder\Core;

use SmartBundleBuilder\Admin\Menu;
use SmartBundleBuilder\Admin\Dashboard;

class Plugin
{
    public function register(Loader $loader): void
    {
        $menu = new Menu();

        $dashboard = new Dashboard();

        $loader->addAction(
            'admin_menu',
            $menu,
            'register'
        );

        $loader->addAction(
            'admin_enqueue_scripts',
            $dashboard,
            'enqueueAssets'
        );
    }
}