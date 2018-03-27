/**
 * Components dependencies
 */
import classnames from 'classnames';

/*
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blocks;

/**
 * Create Controls wrapper component
 */
export default class Controls extends Component {
	/**
	 * Controls constructor.
	 *
	 * @param props
	 */
	constructor ( props ) {
		super( ...arguments );
	}

	render () {
		return (

			<BlockControls key='controls'>
				<AlignmentToolbar
					value={ this.props.alignment }
					onChange={ this.props.onChangeAlignment }
				/>
			</BlockControls>

		);
	}
}
