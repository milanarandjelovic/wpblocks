<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since    1.0.0
 * @package  wpblocks
 */

// Exit if accessed directly.
if (! defined('ABSPATH')) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function wpblocks_cgb_block_assets()
{
	// Styles.
	wp_enqueue_style(
		'wpblocks-cgb-style-css', // Handle.
		plugins_url('dist/blocks.style.build.css', dirname(__FILE__)), // Block style CSS.
		array('wp-blocks') // Dependency to include the CSS after it.
	// filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // Version: filemtime — Gets file modification time.
	);

	wp_enqueue_script(
		'wpblocks-cgb-block-js', // Handle.
		plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
		array('wp-blocks', 'wp-i18n', 'wp-element')// Dependencies, defined above.
		// filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // Version: filemtime — Gets file modification time.
	);
} // End function wpblocks_cgb_block_assets().

// Hook: Frontend assets.
add_action('enqueue_block_assets', 'wpblocks_cgb_block_assets');

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function wpblocks_cgb_editor_assets()
{
	// Scripts.
	wp_enqueue_script(
		'wpblocks-cgb-block-js', // Handle.
		plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
		array('wp-blocks', 'wp-i18n', 'wp-element') // Dependencies, defined above.
	// filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // Version: filemtime — Gets file modification time.
	);

	// Styles.
	wp_enqueue_style(
		'wpblocks-cgb-block-editor-css', // Handle.
		plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.
		array('wp-edit-blocks') // Dependency to include the CSS after it.
	// filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // Version: filemtime — Gets file modification time.
	);
} // End function wpblocks_cgb_editor_assets().

// Hook: Editor assets.
add_action('enqueue_block_editor_assets', 'wpblocks_cgb_editor_assets');


add_action('rest_api_init', function () {
	register_rest_route('wpblocks/v2', '/wp_ctimelines/all', array(
		'methods'  => 'GET',
		'callback' => 'handle_get_all',
//		'permission_callback' => function () {
//			return current_user_can( 'edit_others_posts' );
//		}
	));
});

function handle_get_all($data)
{
	global $wpdb;
	$query = "SELECT id as value, name as label FROM `wp_ctimelines`";
	$list = $wpdb->get_results($query);

	return $list;
}
