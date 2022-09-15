import { AxiosResponse, AxiosError } from "axios";

export async function responseHandler(response: Promise<AxiosResponse>) {
	try {
		const { data } = await response;
		return data;
	} catch (err) {
		const axiosError = err as AxiosError;
		if (axiosError.response && axiosError.response.status === 500) location.reload();
		else console.log(axiosError.message);
	}
}
