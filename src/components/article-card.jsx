import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import ArticleService from '../service/article'

const ArticleCard = ({item, getArticles, index}) => {
	const navigate = useNavigate()
	const {loggedIn, user} = useSelector(state => state.auth)

	const deleteArticle = async slug => {
		try {
			await ArticleService.deleteArticle(slug)
			getArticles()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='col' key={item.id}>
			<div className='card h-100 shadow-sm'>
				<img src={`https://picsum.photos/900/500?random=${Math.random() * index}`} alt="" style={{height:'233px'}}/>

				<div className='card-body'>
					<p className='card-text fw-bold m-0'>{item.title}</p>
					<p className='card-text'>{item.description}</p>
				</div>
				<div className='card-footer d-flex justify-content-between align-items-center'>
					<div className='btn-group'>
						<button onClick={() => navigate(`/article/${item.slug}`)} type='button' className='btn btn-sm btn-outline-success'>
							View
						</button>
						{loggedIn && user.username === item.author.username && (
							<>
								<button
									onClick={() => navigate(`/edit-article/${item.slug}`)}
									type='button'
									className='btn btn-sm btn-outline-secondary'
								>
									Edit
								</button>
								<button type='button' className='btn btn-sm btn-outline-danger' onClick={() => deleteArticle(item.slug)}>
									Delete
								</button>
							</>
						)}
					</div>
					<small className='text-muted fw-bold text-capitalize'>{item.author.username}</small>
				</div>
			</div>
		</div>
	)
}

export default ArticleCard
