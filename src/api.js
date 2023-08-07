async function query(data) {
    console.log(import.meta.env.VITE_API_TOKEN) 
	const response = await fetch(
		"https://api-inference.huggingface.co/models/MiriFur/gpt2-recipes",
		{
			headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}



export default query;