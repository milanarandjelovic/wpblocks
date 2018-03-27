/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.blocks;
const { PanelBody, PanelColor, ToggleControl, SelectControl } = wp.components;

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
		return [
			<InspectorControls key='inspector'>

				<PanelBody>
					<PanelColor
						title={ __( 'Background Color' ) }
						colorValue={ this.props.attributes.titleBackgroundColor }
						initialOpen={ false }
					>
						<ColorPalette
							value={ this.props.attributes.titleBackgroundColor }
							onChange={ this.props.onChangeBackgroundColor }
						/>
					</PanelColor>

					<PanelColor
						title={ __( 'Text Color' ) }
						colorValue={ this.props.attributes.titleColor }
						initialOpen={ false }
					>
						<ColorPalette
							value={ this.props.attributes.titleColor }
							onChange={ this.props.onChangeColor }
						/>
					</PanelColor>

					<ToggleControl
						label={ __( 'Show title line' ) }
						checked={ this.props.attributes.checkTitleLine }
						onChange={ this.props.toggleTitleLine }
					/>

					{
						this.props.attributes.checkTitleLine ? (
							// Show select control for display or hide title line
							<SelectControl
								label={ __( 'Title line position' ) }
								value={ this.props.attributes.titleLinePosition }
								onChange={ ( value ) => this.props.toggleTitleLinePosition( value ) }
								options={
									[
										{ label: 'Left', value: 'left' },
										{ label: 'Center', value: 'center' },
										{ label: 'Right', value: 'right' },
									]
								}
							/>
						) : null

					}

				</PanelBody>

			</InspectorControls>
		];
	}
}
