import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import ArticleService from '../service/article'
import {getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess} from '../slice/article'
import moment from 'moment'
import {Loader} from '../ui'

const ArticleDetail = () => {
	const {slug} = useParams()
	const dispatch = useDispatch()
	const {articleDetail, isLoading} = useSelector(state => state.article)

	useEffect(() => {
		const getArticleDetail = async () => {
			dispatch(getArticleDetailStart())
			try {
				const response = await ArticleService.getArticleDetail(slug)
				dispatch(getArticleDetailSuccess(response.article))
			} catch (error) {
				dispatch(getArticleDetailFailure())
			}
		}

		getArticleDetail()
	}, [slug])

	return isLoading ? (
		<Loader />
	) : (
		articleDetail !== null && (
			<div>
				<div className='py-3 mb-4  rounded-3'>
					<div className='container-fluid pb-5'>
						<h1 className='display-5 fw-bold'>{articleDetail.title}</h1>
						<p className='col-md-8 fs-4'>{articleDetail.description}</p>
						<p className='text-muted'>
							<span className='fw-bold'>Created at:</span> {moment(articleDetail.createdAt).format('DD MMM, YYYY')}
						</p>
						<div class='col-md-6'>
							<div class='row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'>
								<div class='col p-4 d-flex flex-column position-static'>
									<strong class='d-inline-block mb-2 text-primary text-uppercase'>{articleDetail.author.username}</strong>
									<p class='card-text mb-auto'>{articleDetail.author.bio}</p>
								</div>
								<div class='col-auto d-none d-lg-block'>
								<img src={`https://picsum.photos/500/500?random=${Math.random() * 100}`} alt="" style={{height:'233px'}}/>

								</div>
							</div>
						</div>
						<div>{articleDetail.body}</div>
					</div>
				</div>
			</div>
		)
	)
}

export default ArticleDetail
