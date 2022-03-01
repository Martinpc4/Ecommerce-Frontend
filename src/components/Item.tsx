// ! Imports
// * React Components
import { Link } from 'react-router-dom';
// * Interfaces
import { ItemProps } from '../interfaces/components.interface';

// ! Component Definition
function Item(props: ItemProps): JSX.Element {
	return (
		<div className='row gy-3'>
			<div className='col-12'>
				<Link
					to={`/Shop/${props.categoryId}/${props._id}`}
					className='row text-decoration-none align-items-center justify-content-center gy-3'
				>
					<div className='col-12'>
						<p className='text-dark m-0 fs-xs-6 fs-5 text-nowrap'>{props.name}</p>
					</div>
					<div className='col-12 d-flex flex-row align-items-center justify-content-center'>
						<img className='img-fluid limit' src={String(props.imagesURL[0])} alt='' />
					</div>
				</Link>
			</div>
			<div className='col-12'>
				<p className='m-0 fs-6 text-start text-nowrap'>
					{props.memory !== null ? `${props.name} - ${props.memory}Gb` : `${props.name}`}
				</p>
			</div>
			<div className='col-12'>
				<p className='m-0 fs-6 text-start'>{props.price},00 USD $</p>
			</div>
		</div>
	);
}

// ! Exports
export default Item;
