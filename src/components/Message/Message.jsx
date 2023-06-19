import {useMemo} from 'react'
import styles from './Message.module.css'
import avatar from './assets/avatar.png'
import starRegular from './assets/star-regular.svg'
import starSolid from './assets/star-solid.svg'
import play from './assets/play.svg'
import {useDispatch, useSelector} from 'react-redux'
import {addFavoriteMessage, removeFavoriteMessage, showVideoModal} from '../../redux/reducers/MessageSlice'

const Message = ({id, postName, author, date, content, attachments, tags}) => {
	const dispatch = useDispatch()
	const favorites = useSelector(state => state.messages.favorites)

	const getTime = useMemo(() => {
		const time = new Date(date)
		let hours = time.getHours()
		let minutes = time.getMinutes()

		if (hours.toString().length == 1) hours = '0' + hours
		if (minutes.toString().length == 1) minutes = '0' + minutes

		return hours + ':' + minutes
	}, [date])

	return (
		<div className={styles.message}>
			<header>
				<img className={styles.avatar} src={avatar} alt="аватар пользователя" />
				<title>
					<h3>{author}</h3>
					{postName && <h5>{postName}</h5>}
				</title>
				{favorites && favorites.includes(id) ? (
					<img className={styles.favoriteStar} src={starSolid} width="23px" alt="Добавить в избранное" onClick={() => dispatch(removeFavoriteMessage(id))} />
				) : (
					<img className={styles.star} src={starRegular} width="23px" alt="Добавить в избранное" onClick={() => dispatch(addFavoriteMessage(id))} />
				)}
			</header>

			<section>
				<time dateTime={date}>{getTime}</time>
				<div className={styles.contents}>
					{content && <p>{content}</p>}
					{attachments &&
						attachments.map((media, index) => {
							return media.type === 'image' ? (
								<img key={index} src={media.url} className={styles.media} />
							) : (
								<div
									key={index}
									className={styles.media}
									onClick={() => {
										dispatch(showVideoModal(media.url))
									}}
								>
									<video src={media.url} />
									<img src={play} className={styles.play} width="20px" alt="Запуск видео" />
								</div>
							)
						})}
				</div>
			</section>

			{tags && (
				<ul className={styles.tags}>
					{tags.map((tag, index) => (
						<li className={index ? styles.tag : styles.tag + ' ' + styles.firstTag} key={index}>
							{tag}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Message
