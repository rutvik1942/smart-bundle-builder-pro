<?php

namespace SmartBundleBuilder\Admin;

class Menu
{
    public function register(): void
    {
        add_menu_page(
            'Smart Bundle Builder',
            'Smart Bundles',
            'manage_options',
            'smart-bundle-builder',
            [new Dashboard(),'render'],
            'dashicons-products',
            56
        );
    }

    public function render(): void
    {
        echo '<div class="wrap">';
        echo '<h1>Smart Bundle Builder Pro</h1>';
        echo '<p>Dashboard is loading...</p>';
        echo '</div>';
    }
}