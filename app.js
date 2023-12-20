const stickySection = [...document.querySelectorAll('.sticky')];
// let images = [
// 	'https://res.cloudinary.com/drhg6wpcy/image/upload/c_fit,dpr_2.0,fl_lossy,q_auto:eco,w_1720/v1/betterme.world/about/ps-1_hlc62w',
// 	'https://res.cloudinary.com/drhg6wpcy/image/upload/c_fit,dpr_2.0,fl_lossy,q_auto:eco,w_1720/v1/betterme.world/about/ps-2_jhng2l',
// 	'https://res.cloudinary.com/drhg6wpcy/image/upload/c_fit,dpr_2.0,fl_lossy,q_auto:eco,w_1720/v1/betterme.world/about/ps-3_fics3l',
// 	'https://res.cloudinary.com/drhg6wpcy/image/upload/c_fit,dpr_2.0,fl_lossy,q_auto:eco,w_1720/v1/betterme.world/about/ps-4_trjujo',
// ];
// images.forEach(img => {
// 	stickySection.forEach(section => {
// 		let image = document.createElement('img');
// 		image.src = img;
// 		section.querySelector('.scroll_section').appendChild(image);
// 	});
// });

window.addEventListener('scroll', (e) => {
	for(let i = 0; i < stickySection.length; i++) {
		transform(stickySection[i]);
	}
});

function transform(section) {
	const offsetTop = section.parentElement.offsetTop;
	const scrollSection = section.querySelector('.scroll_section');
	let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
	percentage = percentage < 0 ? 0 : percentage > 300 ? 300 : percentage;
	scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`;
}