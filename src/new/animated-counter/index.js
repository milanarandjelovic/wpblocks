/**
 * Block dependencies
 */
import classnames from 'classnames';
import './style.scss';
import './editor.scss';
import icon from './icon';

require( './waypoint' );
require( './jquery-counter' );

import Inspector from './inspector';

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

			showGradientIconValue: {
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

			const {
				counterValue,
				preSuffixValue,
				prefixValue,
				suffixValue,
				iconAlignmentValue,
				textCounterValue,
				textSizeValue,
				iconDisplayValue,
				iconValue,
				toggleGradientValue,
				showGradientIconValue,
				counterBackgroundColor,
				counterSecondBackgroundColor,
				iconColor,
				iconSecondColor,
				textColor,
				textSecondColor
			} = props.attributes;

			/**
			 * Set counter value.
			 *
			 * @param value
			 */
			const onChangeCounterValue = ( value ) => {
				props.setAttributes( { counterValue: value } );
			};

			/**
			 * Set preSuffixValue.
			 *
			 * @param value
			 */
			const onChangePreSuffixValue = ( value ) => {
				props.setAttributes( { preSuffixValue: value } );
			};

			/**
			 * Set prefixValue.
			 *
			 * @param value
			 */
			const onChangePrefixValue = ( value ) => {
				props.setAttributes( { prefixValue: value } );
			};

			/**
			 * Set suffixValue.
			 *
			 * @param value
			 */
			const onChangeSuffixValue = ( value ) => {
				props.setAttributes( { suffixValue: value } );
			};

			/**
			 * Set iconAlignmentValue.
			 *
			 * @param value
			 */
			const onChangeIconAlignmentValue = ( value ) => {
				props.setAttributes( { iconAlignmentValue: value } );
			};

			/**
			 * Set textCounterValue.
			 *
			 * @param value
			 */
			const onChangeTextCounterValue = ( value ) => {
				props.setAttributes( { textCounterValue: value } );
			};

			/**
			 * Set textSizeValue.
			 *
			 * @param value
			 */
			const onChangeTextSizeValue = ( value ) => {
				props.setAttributes( { textSizeValue: value } );
			};

			/**
			 * Set iconDisplayValue.
			 *
			 * @param value
			 */
			const onChangeIconDisplayValue = ( value ) => {
				props.setAttributes( { iconDisplayValue: value } );
			};

			/**
			 * Set iconValue.
			 *
			 * @param value
			 */
			const onChangeIconValue = ( value ) => {
				props.setAttributes( { iconValue: value } );
			};

			/**
			 * Set toggleGradientValue.
			 *
			 * @param value
			 */
			const onChangeToggleGradientValue = ( value ) => {
				props.setAttributes( { toggleGradientValue: value } );
			};

			/**
			 * Set counterBackgroundColor.
			 * @param value
			 */
			const onChangeCounterBackgroundColor = ( value ) => {
				props.setAttributes( { counterBackgroundColor: value } );
			};

			/**
			 * Set counterSecondBackgroundColor.
			 *
			 * @param value
			 */
			const onChangeCounterSecondBackgroundColor = ( value ) => {
				props.setAttributes( { counterSecondBackgroundColor: value } );
			};

			/**
			 * Set showGradientIconValue.
			 *
			 * @param value
			 */
			const onChangeToggleGradientIconValue = ( value ) => {
				props.setAttributes( { showGradientIconValue: value } );
			};

			/**
			 * Set iconColor.
			 *
			 * @param value
			 */
			const onChangeIconColor = ( value ) => {
				props.setAttributes( { iconColor: value } );
			};

			/**
			 * Set iconSecondColor.
			 *
			 * @param value
			 */
			const onChangeIconSecondColor = ( value ) => {
				props.setAttributes( { iconSecondColor: value } );
			};

			/**
			 * Set onChangeTextColor.
			 *
			 * @param value
			 */
			const onChangeTextColor = ( value ) => {
				props.setAttributes( { textColor: value } );

			};

			/**
			 * Set textSecondColor.
			 *
			 * @param value
			 */
			const onChangeTextSecondColor = ( value ) => {
				props.setAttributes( { textSecondColor: value } );

			};

			const counterStyle = {
				background: '-webkit-linear-gradient(left,' + counterBackgroundColor + ' , ' + counterSecondBackgroundColor + ')'
			};

			const prefixAndSuffixStyles = {
				color: textColor
			};

			return [

				!!props.focus && (
					<Inspector
						{ ...{
							onChangeCounterValue,
							onChangePreSuffixValue,
							onChangePrefixValue,
							onChangeSuffixValue,
							onChangeIconAlignmentValue,
							onChangeTextCounterValue,
							onChangeTextSizeValue,
							onChangeIconDisplayValue,
							onChangeIconValue,
							onChangeToggleGradientValue,
							onChangeCounterBackgroundColor,
							onChangeCounterSecondBackgroundColor,
							onChangeToggleGradientIconValue,
							onChangeIconColor,
							onChangeIconSecondColor,
							onChangeTextColor,
							onChangeTextSecondColor,
							...props
						} }
					/>
				),

				<div
					className={ classnames( props.className, 'animated-countdown' ) }
					style={ counterStyle }
				>
					{
						iconDisplayValue === 'yes' ? (
							<p className='counter-icon'>
								<i className={ iconValue }></i>
							</p>
						) : null
					}
					<div style={ prefixAndSuffixStyles }>{ textCounterValue }</div>
					{
						preSuffixValue === 'prefix' || preSuffixValue === 'both' ? (
							<div style={ prefixAndSuffixStyles }>{ prefixValue }</div>
						) : null
					}
					<p className='countdown' data-to={ counterValue } data-easing="easeInOutCubic">
						{ 0 }
					</p>
					{
						preSuffixValue === 'suffix' || preSuffixValue === 'both' ? (
							<div style={ prefixAndSuffixStyles }>{ suffixValue }</div>
						) : null
					}
				</div>

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

			const {
				counterValue,
				preSuffixValue,
				prefixValue,
				suffixValue,
				iconAlignmentValue,
				textCounterValue,
				textSizeValue,
				iconDisplayValue,
				iconValue,
				toggleGradientValue,
				showGradientIconValue,
				counterBackgroundColor,
				counterSecondBackgroundColor,
				iconColor,
				iconSecondColor,
				textColor,
				textSecondColor
			} = props.attributes;

			const prefixAndSuffixStyles = {
				color: textColor
			};

			return (
				<div className={ classnames( props.className, 'animated-countdown' ) }>
					{
						iconDisplayValue === 'yes' ? (
							<p className='counter-icon'>
								<i className={ iconValue }></i>
							</p>
						) : null
					}
					<div style={ prefixAndSuffixStyles }>{ textCounterValue }</div>
					{
						preSuffixValue === 'prefix' || preSuffixValue === 'both' ? (
							<div style={ prefixAndSuffixStyles }>{ prefixValue }</div>
						) : null
					}
					<p className='countdown' data-to={ counterValue } data-easing="easeInOutCubic">
						{ 0 }
					</p>
					{
						preSuffixValue === 'suffix' || preSuffixValue === 'both' ? (
							<div style={ prefixAndSuffixStyles }>{ suffixValue }</div>
						) : null
					}
				</div>

			);
		},
	}
);
