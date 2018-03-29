import classnames from "classnames";

const AnimatedCounter = ( props ) => {
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
	} = props.attributes;

	const counterStyle = toggleGradientValue === 'yes' ?
		{ background: '-webkit-linear-gradient(left, ' + counterBackgroundColor + ' , ' + counterSecondBackgroundColor + ')' } :
		{ backgroundColor: counterBackgroundColor };

	const iconStyle = toggleGradientIconValue === 'yes' ?
		{ background: '-webkit-linear-gradient(left, ' + iconColor + ' , ' + iconSecondColor + ')' } :
		{ backgroundColor: iconColor };

	const textStyle = toggleGradientTextValue === 'yes' ?
		{
			background: '-webkit-linear-gradient(left, ' + textColor + ' , ' + textSecondColor + ')',
			color: 'transparent',
			WebkitBackgroundClip: 'text',
			backgroundClip: 'text'
		} :
		{ color: textColor };

	const prefixStyles = toggleGradientTextValue === 'yes' ?
		{
			color: textColor
		} :
		{ color: textColor };

	const suffixStyles = toggleGradientTextValue === 'yes' ?
		{
			color: textSecondColor
		} :
		{ color: textColor };


	return (
		<div
			className={ classnames( props.className, 'animated-countdown', iconAlignmentValue ) }
			style={ counterStyle }
		>
			{
				iconDisplayValue === 'yes' ? (
					<p className='counter-icon'>
						<i
							className={ iconValue }
							style={ iconStyle }
						></i>
					</p>
				) : null
			}

			<h4 style={ textStyle } className='counter-text'>{ textCounterValue }</h4>

			{
				preSuffixValue === 'prefix' || preSuffixValue === 'both' ? (
					<span style={ prefixStyles }>{ prefixValue }</span>
				) : null
			}

			<p
				className='countdown'
				style={ textStyle }
				data-to={ counterValue }
				data-easing="easeInOutCubic"
			>
				{ 0 }
			</p>

			{
				preSuffixValue === 'suffix' || preSuffixValue === 'both' ? (
					<span style={ suffixStyles }>{ suffixValue }</span>
				) : null
			}

		</div>
	);
};

export default AnimatedCounter;
