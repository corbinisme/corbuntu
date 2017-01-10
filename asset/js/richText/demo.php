<?php
/**
 * Damn Small Rich Text Editor v0.2.4 for jQuery
 * by Roi Avidan <roi@avidansoft.com>
 * Demo: http://www.avidansoft.com/dsrte/
 * Released under the GPL License
 *
 * Includes a minified version of AjaxFileUpload plugin for jQuery, taken from: http://www.phpletter.com/DOWNLOAD/
 * DOES NOT INCLUDE jQuery! You should download jQuery from http://jquery.com
 */

// Must come before all called to plugins!
require_once 'lib/dsrte.php';

// Generate editor instance
$dsrte = new dsRTE( 'dsrte' );

/**
 * Send compressed HTML to the Browser
 */
function sendcompressedcontent( $content )
{
    header( "Content-Encoding: gzip" );
    return gzencode( $content, 9 );
}

// compress HTML
ob_start( 'sendcompressedcontent' );

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" dir="ltr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Style-Type" content="text/css" />
    <title>Damn Small Rich Text Editor v0.2.4 Demo</title>
    <link rel="stylesheet" href="lib/dsrte.css" type="text/css" />
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript"><!--
        // keyboard shortcut keys for current language
        var ctrlb='b',ctrli='i',ctrlu='u';
        //-->
    </script>
    <?=$dsrte->getScripts()?>
</head>
<body>
<?
    if ( $_POST['dsrte_text'] )
    {
        echo "<h3>Generated HTML markup:</h3>";
        echo "<div style=\"border:1px dotted black\">";
        echo "<pre>".htmlentities( $_POST['dsrte_text'] )."</pre>";
        echo "</div>";
    }
?>
    <form method="post" action="?"><div>
    <?=$dsrte->getHTML( $_POST['dsrte_text'] ? $_POST['dsrte_text'] : "Hello World" )?>
    <br />
    <input type="submit" value="Click to submit" />
    </div></form>
</body>
</html>
