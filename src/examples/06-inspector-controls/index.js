/**
 * Block dependencies
 */
import classnames from 'classnames';
import './style.scss';
import icon from './icon';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType, RichText, AlignmentToolbar, BlockControls, InspectorControls, } = wp.blocks;
const { Toolbar, Button, Tooltip, PanelBody, PanelRow, FormToggle, } = wp.components;

/**
 * Register: WPBlocks - Inspector Control.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/inspector-control',
	{

		title: __( 'WPBlocks - Inspector Control' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Inspector Control Block' ),
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
				type: 'boolean',
				default: false,
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

			return [

				!!props.focus && (
					<InspectorControls key='inspector'>

						<PanelBody title={ __( 'High Contrast' ) }>
							<PanelRow>

								<label
									htmlFor='hight-contrast-form-toggle'
									className='blocks-base-control__label'
								>
									{ __( 'High Contrast' ) }
								</label>

								<FormToggle
									id='high-contrast-form-toggle'
									label={ __( 'High Contrast' ) }
									checked={ !!props.attributes.highContrast }
									onChange={ toggleHighContrast }
								/>

							</PanelRow>
						</PanelBody>

					</InspectorControls>
				),

				!!props.focus && (
					<BlockControls key='controls'>

						<AlignmentToolbar
							value={ props.attributes.alignment }
							onChange={ ( value ) => props.setAttributes( { alignment: value } ) }
						/>

						<Toolbar clasName='components-toolabar'>
							<Tooltip title={ __( 'High Contrast' ) }>
								<Button
									className={ classnames(
										'components-icon-button',
										'components-toolbar__control',
										{ 'is-active': props.attributes.highContrast }
									) }
									onClick={ toggleHighContrast }
								>
									{ icon }
								</Button>
							</Tooltip>
						</Toolbar>

					</BlockControls>
				),

				<div className={ classnames(
					props.className,
					{ 'high-contrast': props.attributes.highContrast },
				) }>
					<RichText
						tagName='div'
						multiline='p'
						placeholder={ __( 'Enter your message here..' ) }
						value={ props.attributes.message }
						style={ { textAlign: props.attributes.alignment } }
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

			return (
				<div
					className={ classNames }
					style={ { textAlign: props.attributes.alignment } }
				>
					{ props.attributes.message }
				</div>
			);
		},
	}
);
