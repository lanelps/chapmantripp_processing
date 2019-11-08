let time = 0
let timeset = 10
let isPaused = false

class Disc {
	constructor(tempC, outRadius, inRadius, noDots, dotRaidus, speed, zIndex) {
		this.c = tempC
		this.outerRaid = outRadius
		this.innerRaid = inRadius
		this.dotNumber = noDots
		this.dotRaid = dotRaidus
		this.freq = speed
		this.zindex = zIndex
	}

	display() {
		push()
		translate(0, 0, this.zindex)
		ellipseMode(RADIUS)

		for (let i = 0; i < this.dotNumber; i++) {
			let circle = this.innerRaid + this.outerRaid * sin(time * this.freq * i)
			let col = map(circle, 250, 250, 100, 50)
			let r = map(circle, 40, 50, this.dotRaid, this.dotRaid)
			fill(this.c)
			noStroke()
			ellipse(circle * cos(i), circle * sin(i), r, r)
		}
		pop()
	}
}

let disc1
let button
let colorPicker

function setup() {
	button = createButton('save image')
	button.mousePressed(saveImg)

	button = createButton('Play/Pause')
	button.mousePressed(playPause)

	button = createButton('Reset')
	button.mousePressed(reset)

	colorPicker = createColorPicker('#f15b2b')

	sliderOutRadius = createSlider(1, 500, 250)
	sliderInRadius = createSlider(1, 200, 30)
	sliderNoDots = createSlider(10, 1000, 200)
	sliderDotRadius = createSlider(1, 20, 5)
	sliderSpeed = createSlider(0.0000001, 0.00002, 0.00001, 0.00000001)

	createCanvas(600, 600, WEBGL)
	//disc2 = new Disc(color(23, 21, 67), 200, 20, 300, 10, 0.000005, -10);
}

function draw() {
	disc1 = new Disc(
		color(colorPicker.value()),
		sliderOutRadius.value(),
		sliderInRadius.value(),
		sliderNoDots.value(),
		sliderDotRadius.value(),
		sliderSpeed.value(),
		0
	)

	background(255, 255, 255)
	disc1.display()
	//disc2.display();

	time += timeset
}

function saveImg() {
	saveCanvas('chapmanTripp_screenshot.png')
}

function playPause() {
	if (isPaused) {
		isPaused = false
		timeset = 10
	} else {
		isPaused = true
		timeset = 0
	}
}

function reset() {
	colorPicker.value('#f15b2b')
	isPaused = false
	timeset = 10
	time = 0
}
