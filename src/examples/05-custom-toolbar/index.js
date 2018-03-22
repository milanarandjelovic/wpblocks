/**
 * Block dependencies
 */
import classnames from 'classnames';
import './style.scss';
import './editor.scss';
import icon from './icon';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType, RichText, AlignmentToolbar, BlockControls, } = wp.blocks;
const { Toolbar, Button, Tooltip, } = wp.components;

/**
 * Register: WPBlocks - Custom Toolbar.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/custom-toolbar',
	{

		title: __( 'WPBlocks - Custom Toolbar' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Custom Toolbar Block' ),
			__( 'Call to Action' ),
			__( 'Message' ),
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
				type: 'boolean'
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
			 * Set message attribute to current value.
			 *
			 * @param value
			 */
			const onChangeMessage = ( value ) => {
				props.setAttributes( { message: value } );
			};

			/**
			 * Set alignment.
			 *
			 * @param value
			 */
			const onChangeCustom = ( value ) => {
				props.setAttributes( { alignment: value } );
			};

			const toggleHighContrast = () => {
				props.setAttributes( { highContrast: !props.attributes.highContrast } );
			};

			return (
				<div className={ classnames(
					props.className,
					{ 'high-contrast': props.attributes.highContrast }
				) }>

					{
						!!props.focus && (
							<BlockControls key='custom-controls'>

								<AlignmentToolbar
									value={ props.attributes.alignment }
									onChange={ onChangeCustom }
								/>

								<Toolbar className='components-toolbar'>
									<Tooltip text={ __( 'High Contrast' ) }>
										<Button
											className={ classnames(
												'components-icon-button',
												'components-toolbar__control',
												{ 'is-active': props.attributes.highContrast },
											) }
											onClick={ toggleHighContrast }
										>
											{ icon }
										</Button>
									</Tooltip>
								</Toolbar>

							</BlockControls>
						)
					}

					<RichText
						tagName='div'
						multiline='p'
						placeholder={ __( 'Add your custom message' ) }
						onChange={ onChangeMessage }
						value={ props.attributes.message }
						className={ classnames(
							'message-body',
							{ 'high-contrast': props.attributes.highContrast }
						) }
						style={ { textAlign: props.attributes.alignment } }
						focus={ props.focus }
						onFocus={ props.setFocus }
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
		save: ( props ) => {
			const className = classnames(
				'message-body',
				{ 'high-contrast': props.attributes.highContrast }
			);

			return (
				<div className={ className }
						 style={ { textAlign: props.attributes.alignment } }
				>
					{ props.attributes.message }
				</div>
			);
		},
	}
);
