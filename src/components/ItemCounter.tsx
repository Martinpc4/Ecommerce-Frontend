// ! Imports
// * Interfaces
import { ItemCounterProps } from '../interfaces/components.interface';

// ! Component Definition
function itemCounter({
	itemAmount,
	itemAmountFunction,
	applyChangesFunction,
	cartItemAmount,
	isApplyChanges,
	stockState,
}: ItemCounterProps): JSX.Element {
	return (
		<div className='itemCounter'>
			<div className='itemCounter__counter'>
				<p>{itemAmount}</p>
			</div>
			<div className='itemCounter__plus-btn'>
				<i
					className='bi bi-plus-lg'
					onClick={() => {
						itemAmountFunction(itemAmount + 1);
					}}
				/>
			</div>
			<div className='itemCounter__substr-btn'>
				<i
					className='bi bi-dash-lg'
					onClick={() => {
						if (itemAmount > 0) {
							itemAmountFunction(itemAmount - 1);
						}
					}}
				/>
			</div>
			{Number(itemAmount) !== Number(cartItemAmount) && isApplyChanges && applyChangesFunction !== undefined ? (
				<div className='itemCounter__confirm-btn'>
					<i
						className='bi bi-check'
						onClick={() => {
							if (stockState) {
								applyChangesFunction();
							}
						}}
					/>
				</div>
			) : null}
		</div>
	);
};

// ! Exports
export default itemCounter;
