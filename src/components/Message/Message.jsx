import {useMemo} from 'react'
import styles from './Message.module.css'
import avatar from './assets/avatar.png'

const Message = ({postName, author, date, content, media, tags}) => {
	const getTime = useMemo(() => {
		const time = new Date(date)
		return time.getHours() + ':' + time.getMinutes()
	}, [date])

	return (
		<div className={styles.message}>
			<header>
				<img className={styles.avatar} src={avatar} alt="аватар пользователя" />
				<title>
					<h3>{author}</h3>
					{postName && <h5>{postName}</h5>}
				</title>
			</header>

			<section>
				<time className={styles.time} dateTime={date}>
					{getTime}
				</time>
				<p>{content}</p>
			</section>

			<section>{media && <img src={media.url} className={styles.media}></img>}</section>

			{tags && (
				<ul className={styles.tags}>
					{tags.map(tag => (
						<li className={styles.tag}>tag</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Message
