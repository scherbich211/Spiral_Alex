interface Status {
	getStatus: () => boolean;
	changeStatus: (inStatus: boolean) => void;
}

export const fetchTokenStatus = (function () {
	let instance: Status,
		status = false;

	const getStatus = (): boolean => {
		return status;
	};

	const changeStatus = (inStatus: boolean) => {
		status = inStatus;
	};

	const createInstance = function () {
		return {
			getStatus,
			changeStatus,
		};
	};

	return {
		getInstance: () => {
			if (instance) {
				return instance;
			} else {
				instance = createInstance();
				return instance;
			}
		},
	};
})();
