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
		const {
			onChangePreSuffixValue,
			onChangeCounterValue,
			onChangePrefixValue,
			onChangeSuffixValue,
			onChangeIconAlignmentValue,
			onChangeTextCounterValue,
			onChangeTextSizeValue,
			onChangeIconDisplayValue,
			onChangeIconValue,
			onChangeToggleGradientValue,
			onChangeCounterBackgroundColor,
			onChangeCounterSecondBackgroundColor,
			onChangeToggleGradientIconValue,
			onChangeIconColor,
			onChangeIconSecondColor,
			onChangeTextColor,
			onChangeTextSecondColor
		} = this.props;

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
			showGradientIconValue,
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
						onChange={ ( value ) => onChangeCounterValue( value ) }
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
						onChange={ ( value ) => onChangePreSuffixValue( value ) }
					/>

					{
						preSuffixValue === 'prefix' || preSuffixValue === 'both' ? (
							<TextControl
								label={ __( 'Prefix value' ) }
								help={ __( 'Please enter your prefix.' ) }
								value={ prefixValue }
								onChange={ ( value ) => onChangePrefixValue( value ) }
							/>
						) : null
					}

					{
						preSuffixValue === 'suffix' || preSuffixValue === 'both' ? (
							<TextControl
								label={ __( 'Suffix value' ) }
								help={ __( 'Please enter your suffix.' ) }
								value={ suffixValue }
								onChange={ ( value ) => onChangeSuffixValue( value ) }
							/>
						) : null
					}

					<SelectControl
						label={ __( 'Icon position and text alignment' ) }
						help={ __( 'Choose position for icon and alignment for text.' ) }
						value={ iconAlignmentValue }
						options={
							[
								{ label: __( 'Left' ), value: 'iconLeft' },
								{ label: __( 'Center' ), value: 'iconCenter' },
								{ label: __( 'Right' ), value: 'iconRight' },
							]
						}
						onChange={ ( value ) => onChangeIconAlignmentValue( value ) }
					/>

					<TextControl
						label={ __( 'Text for counter' ) }
						help={ __( 'Please enter your text for counter.' ) }
						value={ textCounterValue }
						onChange={ ( value ) => onChangeTextCounterValue( value ) }
					/>

					<SelectControl
						label={ __( 'Text size' ) }
						help={ __( 'Choose size of font for text.' ) }
						value={ textSizeValue }
						options={
							[
								{ label: __( 'Medium' ), value: 'textMedium' },
								{ label: __( 'Large' ), value: 'textLarge' },
								{ label: __( 'Small' ), value: 'textSmall' },
							]
						}
						onChange={ ( value ) => onChangeTextSizeValue( value ) }
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
						onChange={ ( value ) => onChangeIconDisplayValue( value ) }
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
								onChange={ ( value ) => onChangeIconValue( value ) }
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
						onChange={ ( value ) => onChangeToggleGradientValue( value ) }
					/>

					<SelectControl
						label={ __( 'Icon Gradient' ) }
						help={ __( 'Choose if you want gradient for icon.' ) }
						value={ showGradientIconValue }
						options={
							[
								{ label: __( 'Yes' ), value: 'yes' },
								{ label: __( 'No' ), value: 'no' },
							]
						}
						onChange={ ( value ) => onChangeToggleGradientIconValue( value ) }
					/>

				</PanelBody>

				<PanelColor
					title={ __( 'Counter Background Color' ) }
					colorValue={ counterBackgroundColor }
					initialOpen={ false }
				>
					<ColorPalette
						value={ counterBackgroundColor }
						onChange={ onChangeCounterBackgroundColor }
					/>
				</PanelColor>

				<PanelColor
					title={ __( 'Icon Color' ) }
					colorValue={ iconColor }
					initialOpen={ false }
				>
					<ColorPalette
						value={ iconColor }
						onChange={ onChangeIconColor }
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
								onChange={ onChangeCounterSecondBackgroundColor }
							/>
						</PanelColor>
					) : null
				}

				{
					showGradientIconValue === 'yes' ? (
						<PanelColor
							title={ __( 'Second Icon Color' ) }
							colorValue={ iconSecondColor }
							initialOpen={ false }
						>
							<ColorPalette
								value={ iconSecondColor }
								onChange={ onChangeIconSecondColor }
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
						value={ iconSecondColor }
						onChange={ onChangeTextColor }
					/>
				</PanelColor>

				<PanelColor
					title={ __( 'Second text color' ) }
					colorValue={ textSecondColor }
					initialOpen={ false }
				>
					<ColorPalette
						value={ iconSecondColor }
						onChange={ onChangeTextSecondColor }
					/>
				</PanelColor>

			</InspectorControls>
		];
	}
}
