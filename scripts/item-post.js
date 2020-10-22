function preference(event){
	event.preventDefault()
	const form = new FormData(event.target);
	
	items = [{
		id: form.get("id"),
		title: form.get("title"),
		description: form.get("description"),
		picture_url: form.get("picture_url"),
		quantity: parseInt(form.get("quantity")),
		unit_price: parseFloat(form.get("unit_price"))
	 }]
	 
	fetch("/pay", { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(items) } )
}