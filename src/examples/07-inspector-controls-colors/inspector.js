/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.blocks;
const { PanelBody, PanelRow, PanelColor, FormToggle } = wp.components;

/**
 * Create Inspector Control wrapper component
 */
export default class Inspector extends Component {
	/**
	 * Inspector constructor.
	 *
	 * @param props
	 */
	constructor ( props ) {
		super( ...arguments );
	}

	render () {
		return (
			<InspectorControls key='inspector'>

				<PanelBody
					title={ __( 'High Contrast' ) }
				>
					<PanelRow>

						<label
							htmlFor="high-contrast-form-toggle"
							className='blocks-base-control__label'
						>
							{ __( 'High Contrast' ) }
						</label>

						<FormToggle
							id='high-contrast-form-toggle'
							label={ __( 'High Contrast' ) }
							checked={ !!this.props.attributes.highContrast }
							onChange={ this.props.toggleHighContrast }
						/>

					</PanelRow>
				</PanelBody>

				{ this.props.attributes.highContrast ? <PanelColor
						title={ __( 'High Background Color' ) }
						colorValue={ this.props.attributes.contrastBackgroundColor }
					>
						<ColorPalette
							value={ this.props.attributes.contrastBackgroundColor }
							onChange={ this.props.onChangeContrastBackgroundColor }
						/>
					</PanelColor>
					: null }

			</InspectorControls>
		);
	}
}
