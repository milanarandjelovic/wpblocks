/**
 * Block dependencies
 */
import './style.scss';
import icon from './icon';

import Input from './input';
import Textarea from './textarea';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register: WPBlocks - Input And Textarea.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/input-textarea',
	{

		title: __( 'WPBlocks - Input And Textarea' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Input And Textarea Block' ),
			__( 'HTML' ),
			__( 'Form' ),
		],

		attributes: {
			title: {
				source: 'text',
				type: 'string',
				selector: '.title'
			},

			content: {
				source: 'html',
				selector: '.content'
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

			/**
			 * Set content on textarea change.
			 *
			 * @param event
			 */
			const onChangeTextArea = ( event ) => {
				props.setAttributes( { content: event.target.value } );
			};

			return (
				<div className={ props.className }>

					<h2>
						<Input
							id='example-input-field'
							labelText='Custom Input Field'
							isFullWidth={ true }
							inputValue={ props.attributes.title }
							onChangeInput={ onChangeInput }
						/>
					</h2>

					<p>
						<Textarea
							id='example-textarea'
							labelText='Custom textarea'
							isFullWidth={ true }
							inputValue={ props.attributes.content }
							onChangeTextArea={ onChangeTextArea }
						/>
					</p>

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
				<div>
					<h2 className="title">
						{ props.attributes.title }
					</h2>
					<p className="content">
						{ props.attributes.content }
					</p>
				</div>
			);
		}
	}
);
