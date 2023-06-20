export default function useDebounce() {
	let timer

	return (func, delay) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			func()
		}, delay)
	}
}
