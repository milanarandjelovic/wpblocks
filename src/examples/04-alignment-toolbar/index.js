/**
 * Block dependencies
 */
import './style.scss';
import icon from './icon';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType, RichText, AlignmentToolbar, BlockControls } = wp.blocks;

/**
 * Register: WPBlocks - Alignment Toolbar.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/alignment-toolbar',
	{

		title: __( 'WPBlocks - Alignment Toolbar' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Alignment Toolbar Block' ),
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
			const onChangeAlignment = ( value ) => {
				props.setAttributes( { alignment: value } );
			};

			return (
				<div className={ props.className }>

					{
						!!props.focus && (
							<BlockControls key='controls'>
								<AlignmentToolbar
									value={ props.attributes.alignment }
									onChange={ onChangeAlignment }
								/>
							</BlockControls>
						)
					}

					<RichText
						tagName='div'
						multiline='p'
						placeholder={ __( 'Add your custom message' ) }
						onChange={ onChangeMessage }
						value={ props.attributes.message }
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
			return (
				<div className={ props.className }>
					<div
						className='message-body'
						style={ { textAlign: props.attributes.alignment } }
					>
						{ props.attributes.message }
					</div>
				</div>
			);
		},
	}
);
