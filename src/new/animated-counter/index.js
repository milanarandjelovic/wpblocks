/**
 * Block dependencies
 */
import './style.scss';
import './editor.scss';
import icon from './icon';

require( './waypoint' );
require( './jquery-counter' );

import Inspector from './inspector';
import AnimatedCounter from './animated-counter'

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType, RichText } = wp.blocks;

/**
 * Register: WPBlocks - Animated Counter.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/animated-counter',
	{

		title: __( 'WPBlocks - Animated Counter' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Animated Counter Block' ),
			__( 'Title' ),
		],

		attributes: {
			counterValue: {
				type: 'string',
				default: ''
			},

			preSuffixValue: {
				type: 'string',
				default: 'none'
			},

			prefixValue: {
				type: 'string',
				default: ''
			},

			suffixValue: {
				type: 'string',
				default: ''
			},

			iconAlignmentValue: {
				type: 'string',
				default: 'left'
			},

			textCounterValue: {
				type: 'string',
				default: ''
			},

			textSizeValue: {
				type: 'string',
				default: 'textMedium'
			},

			iconDisplayValue: {
				type: 'string',
				default: 'no'
			},

			iconValue: {
				type: 'string',
				default: ''
			},

			toggleGradientValue: {
				type: 'string',
				default: 'no'
			},

			toggleGradientIconValue: {
				type: 'string',
				default: 'no'
			},

			toggleGradientTextValue: {
				type: 'string',
				default: 'no'
			},

			counterBackgroundColor: {
				type: 'string',
				default: '#ffffff'
			},

			counterSecondBackgroundColor: {
				type: 'string',
				default: '#ffffff'
			},

			iconColor: {
				type: 'string',
				default: '#222'
			},

			iconSecondColor: {
				type: 'string',
				default: '#222'
			},

			textColor: {
				type: 'string',
				default: '#222'
			},

			textSecondColor: {
				type: 'string',
				default: '#222'
			}
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
			 * Set current attribute.
			 *
			 * @param value
			 * @param attribute
			 */
			const handleChange = ( value, attribute ) => {
				props.setAttributes( { [attribute]: value } );
			};

			return [

				!!props.focus && (
					<Inspector{ ...{ handleChange, ...props } }/>
				),

				<AnimatedCounter { ...props }/>

			];
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
				<AnimatedCounter { ...props }/>
			);
		},
	}
);
