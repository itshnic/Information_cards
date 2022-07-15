
"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

// Получить цифры из строки
//parseInt(itemContactpagePhone.replace(/[^\d]/g, ''))

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
// Рендер карточек
class SearchSelector {
	constructor(selectors) {
		this.cardList = selectors.cardList;
		this.wayServer = selectors.wayServer;
	}
	get cardListBlock() {
		return document.getElementById(this.cardList);
	}
	_fetchData() {
		return fetch(this.wayServer)
			.then(response => response.json())
			.then(data => {
				this.dataServer = data;
				this.sortObj(this.dataServer);
				this._renderData(this.dataArr, this.cardListBlock, this.cardList);
			})
			.catch(error => {
				console.log(error);
			});
	}
}
class RenderData extends SearchSelector {
	constructor(selectors) {
		super(selectors);
		this.dataArr = [];
		this._fetchData();
	}
	sortObj(dataList) {
		for (let key in dataList) {
			if (key == this.cardList) {
				this.dataArr = dataList[key];
			}
		}
	}
	checkSummNone(el) {
		let none = "card-balance__summ_total";
		if (el.sum_plan <= 0 || el.sum_plan == null) {
			none = "card-balance__summ_total hidden";
		}
		return none;
	}
	checkSummColor(el) {
		let color = "color:$greenColor;";
		let perсent = (el.sum / el.sum_plan) * 100;
		if (perсent <= 45) {
			color = "color:#fc6e6a;";
		}
		return color;
	}
	checkBgColor(el) {
		let bg = "background:$greenColor;";
		if (el.progress > 50) {
			bg = `background:#fc6e6a;width:${el.progress}%;`;
		} else {
			bg = `width:${el.progress}%;`;
		}
		return bg;
	}

	_patternHtmlBalance(el) {
		return `	<div class="cards__item">
								<div class="card card-balance">
								<h2 class="card-balance__title">${el.title}</h2>
									<div class="card-balance__summ">
										<span style=${this.checkSummColor(el)} class="card-balance__summ_current"> ${
			el.sum
		} ₽</span>
										<span class=${this.checkSummNone(el)}>/${el.sum_plan} ₽</span>
									</div>
								</div>
							</div>`;
	}
	_patternHtmlSupport(el) {
		return `	<div class="cards__item">
										<div class="card card-support">
											<h2 class="card-support__title">${el.title}</h2>
											<div class="card-support__info support-info">
												<div class="support-info__number">
													<div class="support-info__number_project">${el.inwork_count}</div>
													<div class="support-info__number_update">
														<span>${el.burning_count}</span>
														<div class="img__drop">
															<img src="img/Drop.svg" alt="" />
														</div>
													</div>
												</div>
												<div class="support-info__progress">
													<div class="support-info__progress_bar">
														<span style=${this.checkBgColor(el)}></span>
													</div>
													<div class="support-info__progress_time">${el.time_fakt}</div>
												</div>
											</div>
										</div>
									</div>`;
	}

	_renderData(array, block, cardList) {
		if (cardList == "balance") {
			array.forEach(el => {
				block.insertAdjacentHTML("beforeend", this._patternHtmlBalance(el));
			});
		} else if (cardList == "support") {
			array.forEach(el => {
				block.insertAdjacentHTML("beforeend", this._patternHtmlSupport(el));
			});
		}
	}
}

class Active extends RenderData {
	constructor(selectors) {
		super(selectors);
		this.btn = document.getElementById(selectors.btn);
		this.clickOfBtn(this.btn);
	}
	clickOfBtn(block) {
		block.addEventListener("click", () => {
			this._fetchData();
		});
	}
}

let renderBalance = new Active({
	cardList: "balance",
	btn: "balanceBtn",
	wayServer: "json/Server.json",
});

let renderSupport = new Active({
	cardList: "support",
	btn: "supportBtn",
	wayServer: "json/Server.json",
});
