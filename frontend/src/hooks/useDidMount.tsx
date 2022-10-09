import { useRef, useEffect } from "react";

const useDidMount = () => {
	const isMountRef = useRef(true);

	useEffect(() => {
		isMountRef.current = false;
	}, []);

	return isMountRef.current;
};

export default useDidMount;
