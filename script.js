function mergerUrlWithQp(url, qp) {
	url += '?';
	for(const key in qp) {
		url += `${key}=${qp[key]}&`;
	}
	return url.slice(0,-1);
}

function getHeaders(extraHeaders) {
	return {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		...extraHeaders,
		Authorization: localStorage.getItem('token')
	};
}

const get = (url, extraHeaders = {}, qp = {}) => {
	url = mergerUrlWithQp(url, qp);
	const headers = getHeaders(extraHeaders);

	return new Promise((resolve) => {
		fetch(url, { headers, method: 'get' }).then((response) => {
			response.json().then((data) => {
		        resolve({status: true, data});
		    });
		}).catch((err) => {
			catchError(err);
			resolve({status: false, data});
		});
	});
}

const post = (url, payload, extraHeaders = {}, qp = {}) => {
	url = mergerUrlWithQp(url, qp);
	const headers = getHeaders(extraHeaders);

	return new Promise((resolve) => {
		fetch(url, { headers, method: 'post', body: JSON.stringify(payload) }).then((response) => {
			response.json().then((data) => {
		        resolve({status: true, data});
		    });
		}).catch(err => {
			catchError(err);
			resolve({status: false, data});
		});
	});
}

const put = (url, payload, extraHeaders = {}, qp = {}) => {
	url = mergerUrlWithQp(url, qp);
	const headers = getHeaders(extraHeaders);

	return new Promise((resolve) => {
		fetch(url, { headers, method: 'put', body: JSON.stringify(payload) }).then((response) => {
			response.json().then((data) => {
		        resolve({status: true, data});
		    });
		}).catch(err => {
			catchError(err);
			resolve({status: false, data});
		});
	});
}

const httpDelete = (url, payload, extraHeaders = {}, qp = {}) => {
	url = mergerUrlWithQp(url, qp);
	const headers = getHeaders(extraHeaders);

	return new Promise((resolve) => {
		fetch(url, { headers, method: 'delete', body: JSON.stringify(payload) }).then((response) => {
			response.json().then((data) => {
		        resolve({status: true, data});
		    });
		}).catch(err => {
			catchError(err)
			resolve({status: false, data});
		});
	});
}

const catchError = (error) => {
	if(error.status === 401) {
		alert('Session expired!');
	}
	alert(JSON.stringify(error));
}


async function fetchData() {
	const response = await httpDelete('https://jsonplaceholder.typicode.com/posts/1', {}, {}, {name: 'abhinav', mob:90000});
	if(!response.status) {
		alert('Something went wrong in server side...');
		return false;
	}

	console.log(response);
}

async function postData() {
	const response = await post('https://jsonplaceholder.typicode.com/posts', {name: 'Abhinav'});
	console.log(response);
}

