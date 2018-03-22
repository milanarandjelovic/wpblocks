/**
 * Block dependencies
 */
import './style.scss';
import icon from './icon';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType, RichText } = wp.blocks;

/**
 * Register: WPBlocks - Editable.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/editable',
	{

		title: __( 'WPBlocks - Editable' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Editable Block' ),
			__( 'Call to Action' ),
			__( 'Message' ),
		],

		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.message-body'
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

			return (
				<div className={ props.className }>
					<h2>{ __( 'Call to Action' ) }</h2>

					<RichText
						tagName='div'
						placeholder={ __( 'Add your custom message' ) }
						onChange={ onChangeMessage }
						value={ props.attributes.message }
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
					<h2>{ __( 'Call to Action' ) }</h2>
					<div className='message-body'>
						{ props.attributes.message }
					</div>
				</div>
			);
		},
	}
);
