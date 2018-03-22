/**
 * Block dependencies
 */
import './style.scss';
import './editor.scss';
import icon from './icon';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register: WPBlocks - Static.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/static',
	{

		title: __( 'WPBlocks - Static' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Static Block' ),
			__( 'Banner' ),
			__( 'CTA' ),
		],

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 *
		 * The "edit" property must be a valid function.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
		 */
		edit: ( props ) => {
			return (
				<div className={ props.className }>
					<h2>{ __( 'Static Call to Action' ) }</h2>
					<p>{ __( 'This is really important!' ) }</p>
					{
						!!props.focus && (
							<p className="sorry warning">✋ Sorry! You cannot edit this block ✋</p>
						)
					}
				</div>
			);
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into post_content.
		 *
		 * The "save" property must be specified and must be a valid function.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
		 */
		save: ( props ) => {
			return (
				<div className={ props.className }>
					<h2>{ __( 'Static Call to Action' ) }</h2>
					<p>{ __( 'This is really important!' ) }</p>
				</div>
			);
		},
	}
);
