/**
 * Components dependencies
 */
import classnames from 'classnames';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

export default class Input extends Component {
	/**
	 * Input constructor.
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

		return (
			<p>

				<label
					htmlFor={ this.props.id }
					className='blocks-base-control__label'
				>
					{ this.props.labelText }
				</label>

				<input
					id={ this.props.id }
					type='text'
					placeholder={ __( 'Add your text' ) }
					className={ classNames }
					value={ this.props.attributes.title }
					focus={ !!this.props.focus }
					onFocus={ this.props.setFocus }
					onChange={ this.props.onChangeInput }
				/>

			</p>
		);
	}
}
