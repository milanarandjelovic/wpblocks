/**
 * Block dependencies
 */
import classnames from 'classnames';
import './style.scss';
import icons from './icons';

import Input from './input';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType, UrlInput } = wp.blocks;
const { IconButton, Tooltip } = wp.components;

/**
 * Register: WPBlocks - URL input.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/url-input',
	{

		title: __( 'WPBlocks - URL input' ),

		icon: icons.main,

		category: 'common',

		keywords: [
			__( 'WPBlocks — URL input Block' ),
			__( 'Link' ),
			__( 'Post' ),
		],

		attributes: {
			text: {
				type: 'string',
				source: 'text',
				selector: 'a',
			},

			url: {
				type: 'string',
				source: 'attribute',
				selector: 'a',
				attribute: 'href',
			},

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
			 * Set url.
			 *
			 * @param value
			 */
			const onChangeURL = value => {
				props.setAttributes( { url: value } );
			};

			/**
			 * Set text.
			 *
			 * @param event
			 */
			const onChangeInput = ( event ) => {
				props.setAttributes( { text: event.target.value } );
			};

			const classNames = classnames(
				props.className,
				{ 'in-focus': !!props.focus },
			);

			return (
				<div className={ classNames }>
					{ !!props.focus ? (
						[

							<p>
								<Input
									id="example-input-field"
									labelText="Custom text field"
									inputValue={ props.attributes.text }
									onChangeInput={ onChangeInput }
								/>
							</p>,

							<form
								key="form-link"
								className="blocks-button__inline-link"
								onSubmit={ event => event.preventDefault() }
							>

								<Tooltip text="Add Link">
									{ icons.link }
								</Tooltip>
								<UrlInput
									className="url"
									value={ props.attributes.url }
									onChange={ onChangeURL }
								/>

								<IconButton
									icon="editor-break"
									label={ __( 'Apply' ) }
									type="submit"
								/>

							</form>
						]
					) : (

						<p>
							<a href={ props.attributes.url }>
								{ props.attributes.text || __( 'Edit link' ) }
							</a>
						</p>

					) }

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
				<p>
					<a href={ props.attributes.url }>
						{ props.attributes.text }
					</a>
				</p>
			);
		}
	}
);
