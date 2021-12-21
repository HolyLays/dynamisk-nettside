// HTML-element
	const inpBilde = document.querySelector("#inpBilde");
	const inpTekst = document.querySelector("#inpTekst");
	const inpNamn = document.querySelector("#inpNamn");
	const inpTel = document.querySelector("#inpTel");
	const inpEpost = document.querySelector("#inpEpost")
	const skjema = document.querySelector("#skjema");
	const overlay = document.querySelector("#overlay");
	const Dato = document.querySelector("#Dato");


	const main = document.querySelector("main");
	
	// Firebase
	const db = firebase.database();
	const storage = firebase.storage();
	
	const bloggen = db.ref("bloggen");
	
	
	// Function for å lagre bilde i database og holde oss på
	function lagreBilde(evt) {
	evt.preventDefault();
	
	// Viser overlay
	overlay.style.display = "flex";
	
	// Bildet som blir lastet opp
	const bilde = inpBilde.files[0];
	
	// Kor vi lagrer bildet
	const lagringsplass = storage.ref("bloggbilder/" + ( +new Date() ) + bilde.name);
	
	// Laster opp bildet og annen info
	lagringsplass.put(bilde)
	.then( bilde => bilde.ref.getDownloadURL() )
	.then( url => {
	bloggen.push({
	url: url,
	tekst: inpTekst.value,
	dato: Dato.value,
	namn: inpNamn.value,
	tel: inpTel.value,
	post: inpEpost.value
	});
	skjema.reset();
	overlay.style.display = "none";
	} );
	
	}
	// Funtion for å vise bilde
	function visBilde(snap) {
	const key = snap.key;
	const data = snap.val();
	
	// Sitter bildet og info inn i innerHTML slik at den vises på nettsiden.
	//  Det får taggen article.
	main.innerHTML = `
	<article>
	<img src="${data.url}">
	<p>${data.tekst}</p>
	<p>${data.dato}</p>
	<p>${data.namn}</p>
	<p>${data.tel}</p>
	<p>${data.post}</p>
	</article>
	` + main.innerHTML;
	// slutt på tagg og innerHTML
	}
	
	
	// Event Listeners som venter på submit
	skjema.addEventListener("submit", lagreBilde);
	bloggen.on("child_added", visBilde);

 
