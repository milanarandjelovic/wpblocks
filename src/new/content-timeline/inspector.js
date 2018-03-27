/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.blocks;
const { PanelBody, SelectControl } = wp.components;

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

		this.state = {
			contentTimeLineData: []
		};
	}

	componentDidMount () {
		fetch( 'http://gutenberg.test/wp-json/wpblocks/v2/wp_ctimelines/all', { method: 'GET' } )
			.then( ( res ) => {return res.json();} )
			.then( ( data ) => {
				this.setState( { contentTimeLineData: data } );
			} );
	}

	render () {
		const { contentTimeLineData } = this.state;

		return [
			<InspectorControls key='inspector'>
				<PanelBody>
					<SelectControl
						label={ __( 'Choose Content Timeline Shortcode' ) }
						value={ this.props.attributes.shortcodeID }
						onChange={ ( value ) => this.props.toggleContentTimelineValue( value ) }
						options={ contentTimeLineData }
					/>
				</PanelBody>
			</InspectorControls>
		];
	}
}
