/**
 * Block dependencies
 */
import './style.scss';
import icon from './icon';

import Input from './input';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register: WPBlocks - Input.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/input',
	{

		title: __( 'WPBlocks - Input' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Input Block' ),
			__( 'HTML' ),
			__( 'Form' ),
		],

		attributes: {
			title: {
				source: 'text',
				type: 'string',
				selector: '.message-title'
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
			 * Set title on input change.
			 *
			 * @param event
			 */
			const onChangeInput = ( event ) => {
				props.setAttributes( { title: event.target.value } );
			};

			return (
				<div className={ props.className }>
					<Input
						id='example-input-field'
						labelText='Custom Input Field'
						isFullWidth={ true }
						{ ...{ onChangeInput, ...props } }
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
					<p className='message-title'>
						{ props.attributes.title }
					</p>
				</div>
			);
		}
	}
);
