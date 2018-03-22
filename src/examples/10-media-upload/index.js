/**
 * Block dependencies
 */
import './editor.scss';
import icons from './icons';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType, MediaUpload } = wp.blocks;
const { Button } = wp.components;

/**
 * Register: WPBlocks - Media Upload Button.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/media-upload',
	{

		title: __( 'WPBlocks - Media Upload Button' ),

		icon: icons.main,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Media Upload Button Block' ),
			__( 'Image' ),
			__( 'MediaUploadButton' ),
		],

		attributes: {
			imgURL: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: 'img',
			},

			imgID: {
				type: 'number',
			},

			imgAlt: {
				type: 'string',
				source: 'attribute',
				attribute: 'alt',
				selector: 'img',
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
			 * Set attributes for image.
			 *
			 * @param img
			 */
			const onSelectImage = ( img ) => {
				props.setAttributes( {
					imgID: img.id,
					imgURL: img.url,
					imgAlt: img.alt,
				} );
			};

			/**
			 * Set attributes for image.
			 */
			const onRemoveImage = () => {
				props.setAttributes( {
					imgID: null,
					imgURL: null,
					imgAlt: null,
				} );
			};

			return (
				<div className={ props.className }>

					{ !props.attributes.imgID ? (

						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ props.attributes.imgID }
							render={ ( { open } ) => (
								<Button
									className="components-button button button-large"
									onClick={ open }
								>
									{ icons.upload }
									{ __( 'Upload Image' ) }
								</Button>
							) }
						/>

					) : (

						<p className="image-wrapper">
							<img
								src={ props.attributes.imgURL }
								alt={ props.attributes.imgAlt }
							/>
							{ props.focus ? (
								<Button
									className="remove-image"
									onClick={ onRemoveImage }
								>
									{ icons.remove }
								</Button>
							) : null }

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
					<img
						src={ props.attributes.imgURL }
						alt={ props.attributes.imgAlt }
					/>
				</p>
			);
		}
	}
);
