/**
 * Block dependencies
 */
import classnames from 'classnames';
import './style.scss';
import './editor.scss';
import icon from './icon';

import Controls from './controls';
import Inspector from './inspector';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType, RichText } = wp.blocks;

/**
 * Register: WPBlocks - Title.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	'wpblocks/title',
	{

		title: __( 'WPBlocks - Title' ),

		icon: icon,

		category: 'common',

		keywords: [
			__( 'WPBlocks — Title Block' ),
			__( 'Title' ),
		],

		attributes: {
			title: {
				type: 'string',
				selector: '.custom-title'
			},

			alignment: {
				type: 'string'
			},

			checkBackgroundColor: {
				type: 'boolean',
				default: false
			},

			checkTitleColor: {
				type: 'boolean',
				default: false
			},

			checkTitleLine: {
				type: 'boolean',
				default: false
			},

			titleLinePosition: {
				type: 'string',
				default: 'left'
			},

			titleBackgroundColor: {
				type: 'string',
				default: '#ffffff'
			},

			titleColor: {
				type: 'string',
				default: '#000000'
			},

			titleLineColor: {
				type: 'string',
				default: '#0f75bc'
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
			 * Set alignment.
			 *
			 * @param value
			 */
			const onChangeAlignment = ( value ) => {
				props.setAttributes( { alignment: value } );
			};

			/**
			 * Toggle color palette for title background color.
			 */
			const toggleBackgroundColor = () => {
				props.setAttributes( { checkBackgroundColor: !props.attributes.checkBackgroundColor } );
			};

			/**
			 * Set background color for title.
			 *
			 * @param value
			 */
			const onChangeBackgroundColor = ( value ) => {
				props.setAttributes( { titleBackgroundColor: value } );
			};

			/**
			 * Toggle color pallet for title color.
			 */
			const toggleColor = () => {
				props.setAttributes( { checkTitleColor: !props.attributes.checkTitleColor } );
			};

			/**
			 * Set color for title.
			 *
			 * @param value
			 */
			const onChangeColor = ( value ) => {
				props.setAttributes( { titleColor: value } );
			};

			/**
			 * Toggle title line.
			 */
			const toggleTitleLine = () => {
				props.setAttributes( { checkTitleLine: !props.attributes.checkTitleLine } );
			};

			/**
			 * Set title line position.
			 *
			 * @param value
			 */
			const toggleTitleLinePosition = ( value ) => {
				props.setAttributes( { titleLinePosition: value } );
			};

			return [

				/**
				 * Add Inspector block with color palette.
				 */
				!!props.focus && (
					<Inspector { ...{
						toggleBackgroundColor,
						onChangeBackgroundColor,
						toggleColor,
						onChangeColor,
						toggleTitleLine,
						toggleTitleLinePosition,
						...props
					} }
					/>
				),

				/**
				 * Add alignment controls on focus.
				 */
				!!props.focus && (
					<Controls
						{ ...{ onChangeAlignment, ...props } }
					/>
				),

				<div className={ getDefaultClassNames( props ) }>
					<RichText
						tagName='div'
						placeholder={ __( 'Add your custom title' ) }
						onChange={ ( value ) => props.setAttributes( { title: value } ) }
						value={ props.attributes.title }
						focus={ props.focus }
						onFocus={ props.setFocus }
						style={ getTitleCustomStyle( props ) }
					/>

					{ getTitleLine( props ) }
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
			return (
				<div className={ getDefaultClassNames( props ) }>
					<div
						className='custom-title'
						style={ getTitleCustomStyle( props ) }
					>
						{ props.attributes.title }
					</div>
					{ getTitleLine( props ) }
				</div>
			);
		},
	}
);

/**
 * Return custom classes.
 *
 * @param props
 * @returns {*}
 */
const getDefaultClassNames = ( props ) => {
	return classnames(
		props.className,
	);
};

/**
 * Return title line.
 *
 * @param props
 * @returns {null}
 */
const getTitleLine = ( props ) => {
	const titleLineStyle = {
		textAlign: props.attributes.titleLinePosition,
		backgroundColor: props.attributes.titleLineColor
	};

	return (
		props.attributes.checkTitleLine === true ? (
			<div className='title-line' style={ titleLineStyle }></div>
		) : null
	);
};

/**
 * Return title custom style.
 *
 * @param props
 * @returns {{textAlign: {type: string}|attributes.alignment|{type}|*, backgroundColor: {type: string, default: string}|attributes.titleBackgroundColor|{type, default}|*, color: {type: string, default: string}|attributes.titleColor|{type, default}|*}}
 */
const getTitleCustomStyle = ( props ) => {
	return (
		{
			textAlign: props.attributes.alignment,
			backgroundColor: props.attributes.titleBackgroundColor,
			color: props.attributes.titleColor
		}
	);
};
