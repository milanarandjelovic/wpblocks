/**
 * Block dependencies
 */
import './style.scss';
import './editor.scss';
import icon from './icon';

import Inspector from './inspector';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RawHTML } = wp.element;

/**
 * Register: WPBlocks - Title.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/content-timeline',
	{

		title: __( 'WPBlocks - Content Timeline' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Content Timeline Block' ),
			__( 'Content Timeline' ),
		],

		attributes: {
			text: {
				type: 'string',
				source: 'text',
			},

			shortcodeID: {
				type: 'string'
			}
		},

		transforms: {
			from: [
				{
					type: 'shortcode',
					// Per "Shortcode names should be all lowercase and use all
					// letters, but numbers and underscores should work fine too.
					// Be wary of using hyphens (dashes), you'll be better off not
					// using them." in https://codex.wordpress.org/Shortcode_API
					// Require that the first character be a letter. This notably
					// prevents footnote markings ([1]) from being caught as
					// shortcodes.
					tag: '[a-z][a-z0-9_-]*',
					attributes: {
						text: {
							type: 'string',
							shortcode: ( attrs, { content } ) => {
								return content;
							},
						},
					},
					priority: 20,
				},
			],
		},

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 *
		 * The "edit" property must be a valid function.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
		 */
		edit: ( props ) => {
			/**
			 * Set shortcodeID.
			 *
			 * @param value
			 */
			const toggleContentTimelineValue = ( value ) => {
				props.setAttributes( { shortcodeID: value } );

				if ( undefined !== props.attributes.shortcodeID ) {
					const shortcode = `[content_timeline id="${value}"]`;
					props.setAttributes( { text: shortcode } );
				}
			};

			return (
				<div>
					<p>Choose Content Timeline Shortcode</p>
					<Inspector
						{ ...{ toggleContentTimelineValue, ...props } }
					/>
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
		save: ( { attributes } ) => {
			return (
				<RawHTML>{ attributes.text }</RawHTML>
			);
		},
	}
);
