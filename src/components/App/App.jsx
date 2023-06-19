import {useEffect} from 'react'
import Message from '../Message/Message'
import styles from './App.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {fetchMessages, setDirection, setFavoritMessages} from '../../redux/reducers/MessageSlice'
import VideoModal from '../VideoModal/VideoModal'

const App = () => {
	const dispatch = useDispatch()

	const messages = useSelector(state => state.messages.messages)
	const isLoading = useSelector(state => state.messages.isLoading)
	const error = useSelector(state => state.messages.error)
	const favorites = useSelector(state => state.messages.favorites)
	const direction = useSelector(state => state.messages.direction)
	console.log(direction)

	useEffect(() => {
		dispatch(fetchMessages())

		const favoritesStorage = JSON.parse(localStorage.getItem('favorites'))
		if (Array.isArray(favoritesStorage)) dispatch(setFavoritMessages(favoritesStorage))
	}, [])

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}, [favorites])

	return (
		<>
			<div className={styles.container}>
				<header>
					<p>Сортировка</p>
					<select onChange={e => dispatch(setDirection(e.target.value))}>
						<option value="normal">Сначала старые</option>
						<option value="reverse">Сначала новые</option>
					</select>
				</header>

				{isLoading && <h3>Загрузка сообщений...</h3>}
				{error && <h3>Ошибка загрузки сообщений</h3>}
				<div className={`${styles.messages} ${direction === 'reverse' ? styles.reverse : ''}`}>
					{messages &&
						messages.map(message => (
							<Message
								key={message.id}
								id={message.id}
								author={message.author}
								content={message.content}
								date={message.date}
								attachments={message.attachments}
								// tags={['', '']}
							/>
						))}
				</div>
			</div>
			<VideoModal />
		</>
	)
}

export default App
