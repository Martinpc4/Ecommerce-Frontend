// ! Import
// * Libraries
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// * Styles
// Components
import './styles/css/components.css';
// Bootstrap (Modified)
import './styles/css/bootstrap-modified.css'; // bootstrap modified styles
import 'bootstrap/dist/js/bootstrap'; // bootstrap js
// * Components
import NavBar from './components/NavBar';
import Shop from './components/Shop';
import Home from './components/Home';
import Footer from './components/Footer';
import ItemDetail from './components/ItemDetail';
import Cart from './components/Cart';
import Error from './components/Error';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import UserEmailVerify from './components/UserEmailVerify';
import UserProfileUpdate from './components/UserProfileUpdate';
import UserPasswordUpdate from './components/UserPasswordUpdate';
import MessageWidget from './components/MessageWidget';
// * Contexts
import AuthProvider from './components/contexts/CustomAuthProvider';
import CartProvider from './components/contexts/CustomCartProvider';
import UserProvider from './components/contexts/CustomUserProvider';
import SocketProvider from './components/contexts/CustomSocketProvider';
import ProtectedRoutes from './components/ProtectedRoutes';
import Checkout from './components/Checkout';
import LoginSocial from './components/LoginSocial';

function App(): JSX.Element {
	return (
		<BrowserRouter>
			<AuthProvider>
				<UserProvider>
					<SocketProvider>
						<CartProvider>
							<NavBar />
							<main>
								<Routes>
									{/*Unprotected Routes*/}
									<Route path='/' element={<Home />} />
									<Route path='/Shop/:CategoryId' element={<Shop />} />
									<Route path='/Shop/:CategoryId/:ItemId' element={<ItemDetail />} />
									<Route path='/Cart' element={<Cart />} />
									<Route path='/Error/:ErrorId' element={<Error />} />
									<Route path='/signup' element={<Signup />} />
									<Route path='/login' element={<Login />} />
									<Route path='/loginSocial/:Token' element={<LoginSocial />} />
									{/*Protected Routes*/}
									<Route element={<ProtectedRoutes />}>
										<Route path={'/checkout'} element={<Checkout />} />
										<Route path={'/profile'} element={<UserProfile />} />
										<Route path={'/profile/verify'} element={<UserEmailVerify />} />
										<Route path={'/update/profile'} element={<UserProfileUpdate />} />
										<Route path={'/update/password'} element={<UserPasswordUpdate />} />
									</Route>
								</Routes>
								<MessageWidget />
							</main>
							<Footer />
						</CartProvider>
					</SocketProvider>
				</UserProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
