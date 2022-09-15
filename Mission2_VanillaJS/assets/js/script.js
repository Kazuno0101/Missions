function getWidth() {
	return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
}

function getHeight() {
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

document.addEventListener('DOMContentLoaded', () => {
	const rocket = document.getElementById('cat-rocket');
	const turbo = document.getElementById('rocket');
	const planet = [];
	const randomx = [];
	const randomy = [];
	let posx = [];
	let startx = [];
	let randSize = [];

	let id = null;
	clearInterval(id);
	id = setInterval(frame, 5);

	setInterval(turbo_brighness, 1000);

	for (let index = 1; index <= 18; index++) {
		planet[index] = document.getElementById(`planet${index}`);

		randomx[index] = getRandomArbitrary(-5000, -500);
		planet[index].style.top = randomx[index] + 'px';

		posx[index] = randomx[index];
		startx[index] = true;

		randomy[index] = getRandomArbitrary(100, getWidth() - 100);
		if (randomy[index] > getHeight() - 50) {
			planet[index].style.left = randomy[index] - 50 + 'px';
		} else if (randomy[index] < 50) {
			planet[index].style.left = randomy[index] + 50 + 'px';
		} else {
			planet[index].style.left = randomy[index] + 'px';
		}
	}

	let status_rocket = 'left';
	let posy = 0;
	let bot = -200;
	rocket.style.bottom = bot + 'px';
	function frame() {
		setTimeout(() => {
			turbo.style.bottom = '35px';
			planet.forEach((e, i) => {
				if (e.style.top.slice(0, e.style.top.length - 2) >= getHeight() && startx[i]) {
					randomy[i] = getRandomArbitrary(100, getWidth() - 100);
					if (randomy[i] > getHeight() - 50) {
						e.style.left = randomy[i] - 50 + 'px';
					} else if (randomy[i] < 50) {
						e.style.left = randomy[i] + 50 + 'px';
					} else {
						e.style.left = randomy[i] + 'px';
					}

					posx[i] = randomx[i];
					startx[i] = false;

					if (i < 15) {
						randSize[i] = getRandomArbitrary(200, 500);
						if (randSize[i] > 300) {
							e.style.zIndex = 1000;
							e.style.filter = 'blur(1px)';
						} else if (randSize[i] > 400) {
							e.style.zIndex = 1100;
							e.style.filter = 'blur(2px)';
						} else {
							e.style.filter = 'brightness(50%)';
							e.style.zIndex = 900;
						}
						e.style.height = randSize[i] + 'px';
						e.style.width = randSize[i] + 'px';
					} else {
						randSize[i] = getRandomArbitrary(400, 700);
						if (randSize[i] > 500) {
							e.style.zIndex = 1000;
							e.style.filter = 'blur(1px)';
						} else if (randSize[i] > 600) {
							e.style.zIndex = 1100;
							e.style.filter = 'blur(2px)';
						} else {
							e.style.filter = 'brightness(50%)';
							e.style.zIndex = 900;
						}
						e.style.height = randSize[i] + 'px';
						e.style.width = randSize[i] * 1.5 + 'px';
					}
				} else {
					startx[i] = true;
					posx[i] += 1;
					e.style.top = posx[i] + 'px';
				}
			});
		}, 8000);

		setTimeout(() => {
			if (posy > 800) {
				status_rocket = 'right';
			} else if (posy < -800) {
				status_rocket = 'left';
			}

			if (status_rocket == 'left') {
				posy += 0.5;
				turbo.style.left = posy + 'px';
				rocket.style.left = posy + 'px';
			} else {
				posy -= 0.5;
				turbo.style.left = posy + 'px';
				rocket.style.left = posy + 'px';
			}
			console.log(rocket.style.left);
		}, 8000);

		if (bot < 75) {
			bot += 0.3;
			rocket.style.bottom = bot + 'px';
		} else if (bot < 100) {
			bot += 0.1;
			rocket.style.bottom = bot + 'px';
		}
	}

	let turbo_status = true;
	function turbo_brighness() {
		if (turbo_status) {
			turbo_status = false;
			turbo.style.filter = 'brightness(50%)';
		} else {
			turbo_status = true;
			turbo.style.filter = 'brightness(100%)';
		}
	}
});
