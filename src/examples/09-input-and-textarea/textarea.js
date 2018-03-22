/**
 * Components dependencies
 */
import classnames from 'classnames';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

export default class Textarea extends Component {
	/**
	 * Textarea constructor.
	 *
	 * @param props
	 */
	constructor ( props ) {
		super( ...arguments );
	}

	render () {
		const classNames = classnames(
			'wpblocks-field',
			{ 'wide': this.props.isFullWidth }
		);

		return [

			<label
				htmlFor={ this.props.id }
				className='blocks-base-control__label'
			>
				{ this.props.labelText }
			</label>,

			<textarea
				id={ this.props.id }
				placeholder={ __( 'Add your text' ) }
				className={ classNames }
				value={ this.props.inputValue }
				onChange={ this.props.onChangeTextArea }
			/>

		];
	}
}
