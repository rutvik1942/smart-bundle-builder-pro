<?php
/**
 * Plugin Name: Smart Bundle Builder Pro
 * Plugin URI: https://www.narolainfotech.com/
 * Description: A premium WooCommerce plugin to create high-converting product bundles using a modern drag-and-drop builder.
 * Version: 0.1.0
 * Requires at least: 6.8
 * Requires PHP: 8.2
 * Author: Narola Labs
 * Author URI: https://www.narolainfotech.com/
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: smart-bundle-builder-pro
 * Domain Path: /languages
 *
 * @package SmartBundleBuilderPro
 */

if (!defined('ABSPATH')) {
    exit;
}

/*
|--------------------------------------------------------------------------
| Plugin Constants
|--------------------------------------------------------------------------
*/

define('SBB_VERSION', '1.0.0');

define('SBB_PLUGIN_FILE', __FILE__);

define('SBB_PLUGIN_PATH', plugin_dir_path(__FILE__));

define('SBB_PLUGIN_URL', plugin_dir_url(__FILE__));

define('SBB_PLUGIN_BASENAME', plugin_basename(__FILE__));

/*
|--------------------------------------------------------------------------
| Autoloader
|--------------------------------------------------------------------------
*/

require_once SBB_PLUGIN_PATH . 'includes/autoloader.php';

/*
|--------------------------------------------------------------------------
| Activation / Deactivation
|--------------------------------------------------------------------------
*/

register_activation_hook(
    __FILE__,
    ['SmartBundleBuilder\Core\Activator', 'activate']
);

register_deactivation_hook(
    __FILE__,
    ['SmartBundleBuilder\Core\Deactivator', 'deactivate']
);

/*
|--------------------------------------------------------------------------
| Start Plugin
|--------------------------------------------------------------------------
*/

add_action('plugins_loaded', function () {

    if (!class_exists('WooCommerce')) {

        add_action('admin_notices', function () {
            ?>
            <div class="notice notice-error">
                <p>
                    <strong>Smart Bundle Builder Pro</strong>
                    requires WooCommerce.
                </p>
            </div>
            <?php
        });

        return;
    }

    SmartBundleBuilder\Core\Application::boot();

});