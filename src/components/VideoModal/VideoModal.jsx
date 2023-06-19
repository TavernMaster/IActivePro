import {useDispatch, useSelector} from 'react-redux'
import styles from './VideoModal.module.css'
import {showVideoModal} from '../../redux/reducers/MessageSlice'

const VideoModal = () => {
	const dispatch = useDispatch()
	const videoUrl = useSelector(state => state.messages.videoUrl)
	const videoModal = useSelector(state => state.messages.videoModal)

	return (
		<div className={videoModal ? styles.background : styles.none} onClick={() => dispatch(showVideoModal())}>
			<video src={videoUrl} onClick={e => e.stopPropagation()} controls></video>
		</div>
	)
}

export default VideoModal
