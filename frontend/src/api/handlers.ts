import { AxiosResponse, AxiosError } from "axios";

const MINIMUM_RESPONSE_TIME = 500;

export async function responseHandler(response: Promise<AxiosResponse>) {
	try {
		const pre = performance.now();
		const { data } = await response;
		const post = performance.now();
		const responseTime = post - pre;
		if (responseTime < MINIMUM_RESPONSE_TIME) await delay(MINIMUM_RESPONSE_TIME - responseTime);
		return data;
	} catch (err) {
		const axiosError = err as AxiosError;
		if (axiosError.response && axiosError.response.status === 500) location.reload();
		else console.log(axiosError.message);
	}
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
