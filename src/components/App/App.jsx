import Message from '../Message/Message'
import styles from './App.module.css'

const App = () => {
	return (
		<div className={styles.container}>
			<Message
				author={'Nina Malofeeva'}
				content={'Россия 1" не боится снимать сериалы о сложных и неоднозначных периодах в истории нашей страны. Это и "В круге первом", и "Жизнь и судьба", и "Зулейха". Идёт работа над "Одним днём Ивана Денисовича". Вопрос Антону Златопольскому -почему вы считаете'}
				date={'2022-04-03 20:51:15'}
				media={{type: 'image', url: 'https://media.iactive.pro/ZLmYglhqeDD/messages_images/telegram/503vbxSX1Lm5ijF3OKnmlaxrlf4Rzu1l.jpg'}}
			/>
		</div>
	)
}

export default App
