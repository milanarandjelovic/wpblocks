/**
 * Block dependencies
 */
import classnames from 'classnames';
import './style.scss';
import icon from './icon';

import Inspector from './inspector';
import Controls from './controls';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType, RichText } = wp.blocks;

/**
 * Register: WPBlocks - Inspector Control Colors.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/inspector-control-colors',
	{

		title: __( 'WPBlocks - Inspector Control Colors' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Inspector Control Colors Block' ),
			__( 'Palette' ),
			__( 'Settings' ),
		],

		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.message-body'
			},

			alignment: {
				type: 'string'
			},

			highContrast: {
				type: 'boolean',
				default: false,
			},

			contrastBackgroundColor: {
				type: 'string',
				default: '#000000'
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
			 * Toggle highContrast attribute.
			 */
			const toggleHighContrast = () => {
				props.setAttributes( { highContrast: !props.attributes.highContrast } );
			};

			/**
			 * Set contrast background color.
			 *
			 * @param value
			 */
			const onChangeContrastBackgroundColor = ( value ) => {
				props.setAttributes( { contrastBackgroundColor: value } );
			};

			/**
			 * Set alignment.
			 *
			 * @param value
			 */
			const onChangeAlignment = ( value ) => {
				props.setAttributes( { alignment: value } );
			};

			return [

				!!props.focus && (
					<Inspector
						{ ...{ toggleHighContrast, onChangeContrastBackgroundColor, ...props } }
					/>
				),

				!!props.focus && (
					<Controls
						toggleHighContrast={ toggleHighContrast }
						onChangeAlignment={ onChangeAlignment }
						attributes={ {
							highContrast: props.attributes.highContrast,
							alignment: props.attributes.alignment,
						} }
					/>
				),

				<div
					style={ { backgroundColor: props.attributes.contrastBackgroundColor } }
					className={ classnames(
						props.className,
						{ 'high-contrast': props.attributes.highContrast }
					) }
				>
					<RichText
						tagName='div'
						multiline='p'
						placeholder={ __( 'Enter your message here...' ) }
						value={ props.attributes.message }
						className='message-body'
						style={ {
							textAlign: props.attributes.alignment,
						} }
						onChange={ ( value ) => props.setAttributes( { message: value } ) }
						focus={ props.focus }
					/>
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
			const classNames = classnames(
				'message-body',
				{ 'high-contrast': props.attributes.highContrast }
			);

			const customStyle = {
				textAlign: props.attributes.alignment,
				backgroundColor: props.attributes.contrastBackgroundColor
			};

			return (
				<div
					className={ classNames }
					style={ customStyle }
				>
					{ props.attributes.message }
				</div>
			);
		}
	}
);
