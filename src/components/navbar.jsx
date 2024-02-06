import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {logo, plus} from '../constants'
import {removeItem} from '../helpers/persistance-storage'
import {logoutUser} from '../slice/auth'

const Navbar = () => {
	const {loggedIn, user} = useSelector(state => state.auth)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const logoutHandler = () => {
		dispatch(logoutUser())
		removeItem('token')
		navigate('/login')
	}

	return (
		<div className='d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-3'>
			<Link to={'/'} className='text-decoration-none fs-2 text-black fw-bold'>
				<img src={logo} alt='' style={{width:'90px', height:'50px'}} />
				<span className='text-decoration-none'><span className='text-success'>Mee</span><span className='text-danger'>App</span></span>
			</Link>

			<nav className='d-inline-flex mt-2 mt-md-0 ms-md-auto'>
				{loggedIn ? (
					<>
						<Link className='me-3 py-2 text-dark text-decoration-none' to={'/create-article'}>
							<img src={plus} alt=""  style={{width:'30px'}}/>
						</Link>
						<p className='me-3 py-2 m-0 text-dark text-decoration-none bg-success text-white d-flex justify-content-center align-items-center fw-bold fs-3' style={{width:'50px',height:'50px', borderRadius:'50%',}}>{user.username.split('')[0]}</p>
						<button className='btn btn-outline-danger' onClick={logoutHandler}>
							Logout
						</button>
					</>
				) : (
					<>
						<Link className='me-3 py-2 text-dark text-decoration-none' to={'/login'}>
							<button className='btn btn-outline-primary'>
								Login
							</button>
						</Link>
						<Link className='me-3 py-2 text-dark text-decoration-none' to={'/register'}>
						<button className='btn btn-warning'>
								Register
						</button>
						</Link>
					</>
				)}
			</nav>
		</div>
	)
}

export default Navbar
