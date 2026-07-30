<?php

if (!defined('ABSPATH')) {
    exit;
}

spl_autoload_register(function ($class) {

    $prefix = 'SmartBundleBuilder\\';

    if (strpos($class, $prefix) !== 0) {
        return;
    }

    $relative = substr($class, strlen($prefix));

    $relative = str_replace('\\', DIRECTORY_SEPARATOR, $relative);

    $file = SBB_PLUGIN_PATH . 'app/' . $relative . '.php';

    if (file_exists($file)) {
        require_once $file;
    }

});