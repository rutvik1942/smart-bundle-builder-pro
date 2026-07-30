<?php

namespace SmartBundleBuilder\Admin;

defined('ABSPATH') || exit;

class Dashboard
{
    public function enqueueAssets($hook)
    {
        if ($hook !== 'toplevel_page_smart-bundle-builder') {
            return;
        }

        wp_enqueue_style(
            'sbb-dashboard',
            SBB_PLUGIN_URL . 'assets/css/dashboard.css',
            [],
            SBB_VERSION
        );

        wp_enqueue_script(
            'sbb-dashboard',
            SBB_PLUGIN_URL . 'assets/js/dashboard.js',
            [],
            SBB_VERSION,
            true
        );
    }

    public function render()
    {
        ?>
        <div id="sbb-app"></div>
        <?php
    }
}