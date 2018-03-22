/**
 * Component dependencies
 */
import classnames from 'classnames';
import icon from './icon';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blocks;
const { Toolbar, Tooltip, Button } = wp.components;

/**
 * Create a Block Controls wrapper component
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
		const classNames = classnames(
			'components-icon-button',
			'components-toolbar__control',
			{ 'is-active': this.props.attributes.highContrast },
		);

		return (
			<BlockControls key="controls">

				<AlignmentToolbar
					value={ this.props.attributes.alignment }
					onChange={ this.props.onChangeAlignment }
				/>

				<Toolbar
					className='components-toolbar'
				>

					<Tooltip text={ __( 'High Contrast' ) }>
						<Button
							className={ classNames }
							onClick={ this.props.toggleHighContrast }
						>
							{ icon }
						</Button>
					</Tooltip>

				</Toolbar>
			</BlockControls>
		);
	}
}
