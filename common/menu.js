function aplicacionesWeb(type){
	var buttons = [];
	if(type == "Ejercicios" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1y4tYULPMP6f4dCZKy7fBnpXNMn5gwwFu",
			"title":"Ejercicios"
		});
	}
	if(type == "Material" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1FzLuDbrgAukwpsxagiWJRggh_XYxkyxx",
			"title":"Material para revisión",
		});
	}
	if(type == "Consulta" || type == null){
		buttons.push({
			"type":"postback",
			"title":"Consulta",
			"payload":"Conocimiento de aplicaciones web"
		});
	}

	const tema = {
		"title":"Conocimiento de aplicaciones web",
		"image_url":"https://drive.google.com/uc?export=view&id=12P_6Px4tBeK_M9Xk9YN63F_tQSq_BM0r",
		"subtitle":"Este es el tema de Conocimientos de aplicaciones web",
		"buttons":buttons
	};

	return tema;
}

function programacionWeb(type){
	var buttons = [];
	if(type == "Ejercicios" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1MRgIJmLsUlNZfvJX0hSbpR_GkrIz9YVz",
			"title":"Ejercicios"
		});
	}
	if(type == "Material" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1EVw4xZznDPJCM5olMZyLieeehFTMrsic",
			"title":"Material para revisión",
		});
	}
	if(type == "Consulta" || type == null){
		buttons.push({
			"type":"postback",
			"title":"Consulta",
			"payload":"Introducción al lenguaje de programación web"
		});
	}

	const tema = {
		"title":"Introducción al lenguaje de programación web",
		"image_url":"https://drive.google.com/uc?export=view&id=1yyjV1Mx6dbGf7ni3Va2mWKpJDiPHkdI",
		"subtitle":"Este es el tema de Introducción al lenguaje de programación web",
		"buttons":buttons
	};

	return tema;
}

function pasoParametros(type){
	var buttons = [];
	if(type == "Ejercicios" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1sc3-MGviQWf4SJ5FQQBNE6QeoGtr5Tpa",
			"title":"Ejercicios"
		});
	}
	if(type == "Material" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1JVY0p7kBBkEiJiwLa-XMPW8xQFf7GIJS",
			"title":"Material para revisión",
		});
	}
	if(type == "Consulta" || type == null){
		buttons.push({
			"type":"postback",
			"title":"Consulta",
			"payload":"Paso de parámetros entre páginas web"
		});
	}

	const tema = {
		"title":"Paso de parámetros entre páginas web",
		"image_url":"https://drive.google.com/uc?export=view&id=1Qk6O8y3k-SI2gqG-ORO0_irwAtoh9CwY",
		"subtitle":"Este es el tema de Paso de parámetros entre páginas web",
		"buttons":buttons
	};

	return tema;
}

function patronProgramacion(type){
	var buttons = [];
	if(type == "Ejercicios" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1o6MysHBaHjWVDvl9LbyIAYCaOsdSu_7f",
			"title":"Ejercicios"
		});
	}
	if(type == "Material" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1fanKBOW-EN7gilLUrU3RXs7sfEq8qClR",
			"title":"Material para revisión",
		});
	}
	if(type == "Consulta" || type == null){
		buttons.push({
			"type":"postback",
			"title":"Consulta",
			"payload":"Patrón de programación"
		});
	}

	const tema = {
		"title":"Patrón de programación",
		"image_url":"https://drive.google.com/uc?export=view&id=1kJFvh024cgCo4CbJ-rIiTBSCyhwclGle",
		"subtitle":"Este es el tema de Patrón de programación",
		"buttons":buttons
	};

	return tema;
}

function accesoDatos(type){
	var buttons = [];
	if(type == "Ejercicios" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1IrvfZQ3Q4_RXwYi3i4FbUDkv1lSOU8Np",
			"title":"Ejercicios"
		});
	}
	if(type == "Material" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1o0W0dQaK48fIQcWWvK9271H_Hb3mPavi",
			"title":"Material para revisión",
		});
	}
	if(type == "Consulta" || type == null){
		buttons.push({
			"type":"postback",
			"title":"Consulta",
			"payload":"Acceso a base de datos"
		});
	}

	const tema = {
		"title":"Acceso a base de datos",
		"image_url":"https://drive.google.com/uc?export=view&id=1Wytv9weg1_jRCttSiLdrpBzNKtpT-_eh",
		"subtitle":"Este es el tema de Acceso a base de datos",
		"buttons":buttons
	};

	return tema;
}

function sesiones(type){
	var buttons = [];
	if(type == "Ejercicios" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1LRwWdODGkHTyvZe_aP83ochlukD2Ix7M",
			"title":"Ejercicios"
		});
	}
	if(type == "Material" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1p2xiek4Rpk73PKI8IkYMkyuNb4zpmAez",
			"title":"Material para revisión",
		});
	}
	if(type == "Consulta" || type == null){
		buttons.push({
			"type":"postback",
			"title":"Consulta",
			"payload":"Sesiones"
		});
	}

	const tema = {
		"title":"Sesiones",
		"image_url":"https://drive.google.com/uc?export=view&id=156GTSRtM1pZXQ2vnf5n2aO0qzMYNp56H",
		"subtitle":"Este es el tema de Sesiones",
		"buttons":buttons
	};

	return tema;
}

function crud(type){
	var buttons = [];
	if(type == "Ejercicios" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=17-UYFVNWrukWsXWeddmnKPPHXmLJQUTw",
			"title":"Ejercicios"
		});
	}
	if(type == "Material" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1FgRteu5i6SPjXvcdVt3p1svAzvCyvEFP",
			"title":"Material para revisión",
		});
	}
	if(type == "Consulta" || type == null){
		buttons.push({
			"type":"postback",
			"title":"Consulta",
			"payload":"Crud"
		});
	}

	const tema = {
		"title":"Implementación del patrón CRUD",
		"image_url":"https://drive.google.com/uc?export=view&id=1nYdtB6rDLQhyQQQa03puQ3BGxquy8VK1",
		"subtitle":"Este es el tema de Implementación del patrón CRUD",
		"buttons":buttons
	};

	return tema;
}

function reportes(type){
	var buttons = [];
	if(type == "Ejercicios" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1_1NTEwO0dBBrvM9EH8ae-y2NF_7TTaeY",
			"title":"Ejercicios"
		});
	}
	if(type == "Material" || type == null){
		buttons.push({
			"type":"web_url",
			"url":"https://drive.google.com/uc?export=view&id=1o9man5ENMvo666El4__RKG7s3OWZMfOr",
			"title":"Material para revisión",
		});
	}
	if(type == "Consulta" || type == null){
		buttons.push({
			"type":"postback",
			"title":"Consulta",
			"payload":"Generar reportes tipo listado y con parámetros"
		});
	}

	const tema = {
		"title":"Generar reportes tipo listado y con parámetros",
		"image_url":"https://drive.google.com/uc?export=view&id=14D6wFjVt0oZODpdo2ajz1SqP2Y7ooITS",
		"subtitle":"Este es el tema de Generar reportes tipo listado y con parámetros",
		"buttons":buttons
	};

	return tema;
}

module.exports = class Menu{
  	static showMenu(name,type){
		let elements;
		switch(name){
			case "Acceso a base de datos":
				elements = [accesoDatos(type)];
				break;
			case "Conocimiento de aplicaciones web":
				elements = [aplicacionesWeb(type)];
				break;
			case "Generar reportes tipo listado y con parámetros":
				elements = [reportes(type)];
				break;
			case "Implementación del patrón CRUD":
				elements = [crud(type)];
				break;
			case "Introducción al lenguaje de programación web":
				elements = [programacionWeb(type)];
				break;
			case "Paso de parámetros entre páginas web":
				elements = [pasoParametros(type)];
				break;
			case "Patrón de programación":
				elements = [patronProgramacion(type)];
				break;
			case "Sesiones":
				elements = [sesiones(type)];
				break;
			default:
				elements = [accesoDatos(type),aplicacionesWeb(type),reportes(type),crud(type),programacionWeb(type),pasoParametros(type),patronProgramacion(type),sesiones(type)];
				break;
		}

		return elements;
	}
}
