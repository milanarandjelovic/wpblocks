<?php
/**
 * Plugin Name: WPBlocks
 * Plugin URI: https://github.com/milanarandjelovic/
 * Description: WPBlocks — is a Gutenberg plugin created via create-guten-block.
 * Author: Milan Arandjelovic
 * Author URI: https://github.com/milanarandjelovic/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package wpblocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/**
 * Server side rendering for /examples/12-dynamic
 */
function wpblocks_dynamic_block_render() {

	$recent_posts = wp_get_recent_posts( [
		'numberposts' => 1,
		'post_status' => 'publish',
	] );

	if ( count( $recent_posts ) === 0 ) {
		return 'No posts';
	}

	$post    = $recent_posts[0];
	$post_id = $post['ID'];

	return sprintf(
		'<p><a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a></p>',
		esc_url( get_permalink( $post_id ) ),
		esc_html( get_the_title( $post_id ) )
	);
}

// Hook server side rendering into render callback.
register_block_type( 'wpblocks/dynamic', [
	'render_callback' => 'wpblocks_dynamic_block_render',
] );
