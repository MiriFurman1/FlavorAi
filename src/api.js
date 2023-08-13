async function query(modelURL, data) {
	console.log(data);
	const response = await fetch(modelURL, {
		headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
		method: "POST",
		body: JSON.stringify(data),
	});
	const result = await response.json();
	return result;
}

export default query;