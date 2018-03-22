/**
 * Block dependencies
 */
import './style.scss';
import icon from './icon';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { withAPIData } = wp.components;

/**
 * Register: WPBlocks - Dynamic Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/dynamic',
	{

		title: __( 'WPBlocks - Dynamic Block' ),

		icon: icon,

		category: 'widgets',

		keywords: [
			__( 'WPBlocks — Dynamic Block Block' ),
			__( 'Link' ),
			__( 'Post' ),
		],

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 *
		 * The "edit" property must be a valid function.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
		 */
		edit: withAPIData( () => {
			return {
				posts: '/wp/v2/posts?pre_page=1'
			};
		} )( ( { posts, className } ) => {

			if ( !posts.data ) {
				return 'loading !';
			}

			if ( posts.data.length === 0 ) {
				return 'No posts';
			}

			let post = posts.data[ 0 ];

			return (
				<a className={ className } href={ post.link }>
					{ post.title.rendered }
				</a>
			);
		} ),

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into post_content.
		 *
		 * The "save" property must be specified and must be a valid function.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
		 */
		save: () => {
			// Rendering in PHP
			return null;
		}
	}
);
