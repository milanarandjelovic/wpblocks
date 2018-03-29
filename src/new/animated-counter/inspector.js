/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.blocks;
const { PanelBody, TextControl, PanelColor, SelectControl } = wp.components;

/**
 * Create Inspector Control wrapper component
 */
export default class Inspector extends Component {
	/**
	 * Inspector constructor.
	 *
	 * @param props
	 */
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const { handleChange } = this.props;

		const {
			counterValue,
			preSuffixValue,
			prefixValue,
			suffixValue,
			iconAlignmentValue,
			textCounterValue,
			textSizeValue,
			iconDisplayValue,
			iconValue,
			toggleGradientValue,
			toggleGradientIconValue,
			toggleGradientTextValue,
			counterBackgroundColor,
			counterSecondBackgroundColor,
			iconColor,
			iconSecondColor,
			textColor,
			textSecondColor
		} = this.props.attributes;

		return [
			<InspectorControls key='inspector'>

				<PanelBody
					title={ __( 'Settings' ) }
					initialOpen={ false }
				>

					<TextControl
						label={ __( 'Counter value' ) }
						help={ __( 'Please enter your counter value.' ) }
						value={ counterValue }
						onChange={ ( value ) => handleChange( value, 'counterValue' ) }
					/>

					<SelectControl
						label={ __( 'Prefix/Suffix' ) }
						help={ __( 'Choose if you want to display prefix or suffix.' ) }
						value={ preSuffixValue }
						options={
							[
								{ label: __( 'None' ), value: 'none' },
								{ label: __( 'Prefix' ), value: 'prefix' },
								{ label: __( 'Suffix' ), value: 'suffix' },
								{ label: __( 'Both' ), value: 'both' },
							]
						}
						onChange={ ( value ) => handleChange( value, 'preSuffixValue' ) }
					/>

					{
						preSuffixValue === 'prefix' || preSuffixValue === 'both' ? (
							<TextControl
								label={ __( 'Prefix value' ) }
								help={ __( 'Please enter your prefix.' ) }
								value={ prefixValue }
								onChange={ ( value ) => handleChange( value, 'prefixValue' ) }
							/>
						) : null
					}

					{
						preSuffixValue === 'suffix' || preSuffixValue === 'both' ? (
							<TextControl
								label={ __( 'Suffix value' ) }
								help={ __( 'Please enter your suffix.' ) }
								value={ suffixValue }
								onChange={ ( value ) => handleChange( value, 'suffixValue' ) }
							/>
						) : null
					}

					<SelectControl
						label={ __( 'Icon position and text alignment' ) }
						help={ __( 'Choose position for icon and alignment for text.' ) }
						value={ iconAlignmentValue }
						options={
							[
								{ label: __( 'Left' ), value: 'icon-left' },
								{ label: __( 'Center' ), value: 'icon-center' },
								{ label: __( 'Right' ), value: 'icon-right' },
							]
						}
						onChange={ ( value ) => handleChange( value, 'iconAlignmentValue' ) }
					/>

					<TextControl
						label={ __( 'Text for counter' ) }
						help={ __( 'Please enter your text for counter.' ) }
						value={ textCounterValue }
						onChange={ ( value ) => handleChange( value, 'textCounterValue' ) }
					/>

					<SelectControl
						label={ __( 'Text size' ) }
						help={ __( 'Choose size of font for text.' ) }
						value={ textSizeValue }
						options={
							[
								{ label: __( 'Medium' ), value: 'text-medium' },
								{ label: __( 'Large' ), value: 'text-large' },
								{ label: __( 'Small' ), value: 'text-small' },
							]
						}
						onChange={ ( value ) => handleChange( value, 'textSizeValue' ) }
					/>

				</PanelBody>

				<PanelBody
					title={ __( 'Icon Settings' ) }
					initialOpen={ false }
				>

					<SelectControl
						label={ __( 'Display icon' ) }
						help={ __( 'Choose if you want to display icon.' ) }
						value={ iconDisplayValue }
						options={
							[
								{ label: __( 'Yes' ), value: 'yes' },
								{ label: __( 'No' ), value: 'no' },
							]
						}
						onChange={ ( value ) => handleChange( value, 'iconDisplayValue' ) }
					/>

					{
						iconDisplayValue === 'iconShow' ? (
							<SelectControl
								label={ __( 'Icon' ) }
								help={ __( 'Select icon from library.' ) }
								value={ iconValue }
								options={
									[
										{ label: __( 'TODO ADD ICON' ), value: 'addIcon' },
										{ label: __( 'No' ), value: 'iconNo' },
									]
								}
								onChange={ ( value ) => handleChange( value, 'iconValue' ) }
							/>
						) : null
					}

				</PanelBody>

				<PanelBody
					title={ __( 'Gradient Settings' ) }
					initialOpen={ false }
				>

					<SelectControl
						label={ __( 'Counter Gradient' ) }
						help={ __( 'Choose if you want gradient for counter.' ) }
						value={ toggleGradientValue }
						options={
							[
								{ label: __( 'Yes' ), value: 'yes' },
								{ label: __( 'No' ), value: 'no' },
							]
						}
						onChange={ ( value ) => handleChange( value, 'toggleGradientValue' ) }
					/>

					<SelectControl
						label={ __( 'Text Gradient' ) }
						help={ __( 'Choose if you want gradient for text.' ) }
						value={ toggleGradientTextValue }
						options={
							[
								{ label: __( 'Yes' ), value: 'yes' },
								{ label: __( 'No' ), value: 'no' },
							]
						}
						onChange={ ( value ) => handleChange( value, 'toggleGradientTextValue' ) }
					/>

					<SelectControl
						label={ __( 'Icon Gradient' ) }
						help={ __( 'Choose if you want gradient for icon.' ) }
						value={ toggleGradientIconValue }
						options={
							[
								{ label: __( 'Yes' ), value: 'yes' },
								{ label: __( 'No' ), value: 'no' },
							]
						}
						onChange={ ( value ) => handleChange( value, 'toggleGradientIconValue' ) }
					/>

				</PanelBody>

				<PanelColor
					title={ __( 'Counter Background Color' ) }
					colorValue={ counterBackgroundColor }
					initialOpen={ false }
				>
					<ColorPalette
						value={ counterBackgroundColor }
						onChange={ ( value ) => handleChange( value, 'counterBackgroundColor' ) }
					/>
				</PanelColor>

				{
					toggleGradientValue === 'yes' ? (
						<PanelColor
							title={ __( 'Second Background Counter Color' ) }
							colorValue={ counterSecondBackgroundColor }
							initialOpen={ false }
						>
							<ColorPalette
								value={ counterSecondBackgroundColor }
								onChange={ ( value ) => handleChange( value, 'counterSecondBackgroundColor' ) }
							/>
						</PanelColor>
					) : null
				}

				<PanelColor
					title={ __( 'Icon Color' ) }
					colorValue={ iconColor }
					initialOpen={ false }
				>
					<ColorPalette
						value={ iconColor }
						onChange={ ( value ) => handleChange( value, 'iconColor' ) }
					/>
				</PanelColor>

				{
					toggleGradientIconValue === 'yes' ? (
						<PanelColor
							title={ __( 'Second Icon Color' ) }
							colorValue={ iconSecondColor }
							initialOpen={ false }
						>
							<ColorPalette
								value={ iconSecondColor }
								onChange={ ( value ) => handleChange( value, 'iconSecondColor' ) }
							/>
						</PanelColor>
					) : null
				}

				<PanelColor
					title={ __( 'Text color' ) }
					colorValue={ textColor }
					initialOpen={ false }
				>
					<ColorPalette
						value={ textColor }
						onChange={ ( value ) => handleChange( value, 'textColor' ) }
					/>
				</PanelColor>

				{
					toggleGradientTextValue === 'yes' ? (
						<PanelColor
							title={ __( 'Second text color' ) }
							colorValue={ textSecondColor }
							initialOpen={ false }
						>
							<ColorPalette
								value={ textSecondColor }
								onChange={ ( value ) => handleChange( value, 'textSecondColor' ) }
							/>
						</PanelColor>
					) : null
				}

			</InspectorControls>
		];
	}
}
