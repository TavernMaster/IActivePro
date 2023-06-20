import {useEffect, useMemo} from 'react'
import Message from '../Message/Message'
import styles from './App.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {fetchMessages, fetchNewMessages, fetchOldMessages, setDirection, setFavoritMessages} from '../../redux/reducers/MessageSlice'
import VideoModal from '../VideoModal/VideoModal'
import useDebounce from '../../hooks/useDebounce'

const App = () => {
	const dispatch = useDispatch()
	const debounce = useDebounce()

	const messages = useSelector(state => state.messages.messages)
	const isLoading = useSelector(state => state.messages.isLoading)
	const error = useSelector(state => state.messages.error)
	const favorites = useSelector(state => state.messages.favorites)
	const direction = useSelector(state => state.messages.direction)

	const checkPosition = () => {
		const documentHeight = document.body.scrollHeight
		const screenHeight = window.innerHeight

		const scrolled = window.scrollY

		if (scrolled + screenHeight >= documentHeight - screenHeight / 4) {
			debounce(() => dispatch(fetchOldMessages()), 100)
		}
	}

	const messagesFromDirection = useMemo(() => {
		return direction === 'normal' ? messages : messages.slice().reverse()
	}, [messages, direction])

	useEffect(() => {
		dispatch(fetchMessages())

		const favoritesStorage = JSON.parse(localStorage.getItem('favorites'))
		if (Array.isArray(favoritesStorage)) dispatch(setFavoritMessages(favoritesStorage))
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			messages?.length && dispatch(fetchNewMessages(messages[messages.length - 1].id))
		}, 5000)

		return () => clearInterval(interval)
	}, [messages])

	useEffect(() => {
		if (direction === 'reverse') window.addEventListener('scroll', checkPosition)

		return () => {
			window.removeEventListener('scroll', checkPosition)
		}
	}, [direction])

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}, [favorites])

	return (
		<>
			<div className={styles.container}>
				<header className={styles.sort}>
					<p>Сортировка</p>
					<select onChange={e => dispatch(setDirection(e.target.value))}>
						<option value="normal">Сначала старые</option>
						<option value="reverse">Сначала новые</option>
					</select>
				</header>

				{direction === 'normal' && !isLoading && (
					<button className={styles.oldMessagesButton} onClick={() => dispatch(fetchOldMessages())}>
						Загрузить предыдущие
					</button>
				)}
				{isLoading && <h3 className={styles.alert}>Загрузка сообщений...</h3>}
				{error && <h3 className={styles.alert}>Ошибка загрузки сообщений</h3>}

				<div className={styles.messages}>
					{messages &&
						messagesFromDirection.map((message, index) => (
							<Message
								key={index}
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
