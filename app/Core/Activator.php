<?php

namespace SmartBundleBuilder\Core;

class Activator
{
    public static function activate(): void
    {
        flush_rewrite_rules();
    }
}