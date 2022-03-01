// ! Imports
// * React Hooks
import { useParams } from 'react-router-dom';
// * React Components
import ItemList from './ItemList';

// ! Component Definition
function Shop(): JSX.Element {
	const { CategoryId } = useParams();

	return (
		<div className='container m-5'>
			<div className='row'>
				<ItemList categoryId={Number(CategoryId)} />
			</div>
		</div>
	);
};

// ! Exports
export default Shop;
