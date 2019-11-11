import './style.css'
import p5 from 'p5'

const containerElement = document.getElementById('p-container')

const sketch = p => {
	class Disc {
		constructor(tempC, outRadius, inRadius, noDots, dotRaidus, speed) {
			this.c = tempC
			this.outerRaid = outRadius
			this.innerRaid = inRadius
			this.dotNumber = noDots
			this.dotRaid = dotRaidus
			this.freq = speed
		}

		display(p) {
			p.push()
			p.translate(windWidth / 2, windHeight / 2)
			p.ellipseMode(p.RADIUS)

			for (let i = 0; i < this.dotNumber; i++) {
				let circle =
					this.innerRaid + this.outerRaid * p.sin(time * this.freq * i)
				let r = p.map(circle, 40, 50, this.dotRaid, this.dotRaid)
				p.fill(this.c)
				p.noStroke()
				p.ellipse(circle * p.cos(i), circle * p.sin(i), r, r)
			}
			p.pop()
		}
	}

	let time = 0
	let timeset = 10
	let isPaused = false

	let windWidth = 600
	let windHeight = 600

	let disc1
	let button
	let inputWidth
	let inputHeight
	let colorPicker

	let sliderOutRadius
	let sliderInRadius
	let sliderNoDots
	let sliderDotRadius
	let sliderSpeed

	p.setup = function() {
		button = p.createButton('Save Image')
		button.mousePressed(p.saveImg)
		button.addClass('save-image')

		button = p.createButton('Play/Pause')
		button.mousePressed(p.playPause)
		button.addClass('play-pause')

		button = p.createButton('Reset')
		button.mousePressed(p.reset)
		button.addClass('reset')

		p.createElement('br', '')
		p.createElement('br', '')

		p.createElement('label', 'Width')
		inputWidth = p.createInput('600')
		inputWidth.changed(p.windowResized)
		inputWidth.addClass('window-width')

		p.createElement('label', 'Height')
		inputHeight = p.createInput('600')
		inputHeight.changed(p.windowResized)
		inputHeight.addClass('window-height')
		p.createElement('br', '')

		p.createElement('label', 'Color')
		colorPicker = p.createColorPicker('#f15b2b')
		colorPicker.addClass('color-picker')
		p.createElement('br', '')

		p.createElement('label', 'Outer Radius')
		sliderOutRadius = p.createSlider(1, 500, 250)
		sliderOutRadius.addClass('outer-radius')
		p.createElement('br', '')

		p.createElement('label', 'Inner Radius')
		sliderInRadius = p.createSlider(1, 200, 30)
		sliderInRadius.addClass('inner-radius')
		p.createElement('br', '')

		p.createElement('label', 'Dot Number')
		sliderNoDots = p.createSlider(10, 1000, 200)
		sliderNoDots.addClass('dot-number')
		p.createElement('br', '')

		p.createElement('label', 'Dot Size')
		sliderDotRadius = p.createSlider(1, 20, 5)
		sliderDotRadius.addClass('dot-size')
		p.createElement('br', '')

		p.createElement('label', 'Dot Speed')
		sliderSpeed = p.createSlider(0.0000001, 0.00002, 0.00001, 0.00000001)
		sliderSpeed.addClass('dot-speed')
		p.createElement('br', '')

		p.createCanvas(windWidth, windHeight, p.P3D)
	}

	p.draw = function() {
		disc1 = new Disc(
			colorPicker.value(),
			sliderOutRadius.value(),
			sliderInRadius.value(),
			sliderNoDots.value(),
			sliderDotRadius.value(),
			sliderSpeed.value()
		)

		p.background(255)
		disc1.display(p)

		time += timeset
	}

	p.windowResized = () => {
		windWidth = inputWidth.value()
		windHeight = inputHeight.value()
		p.resizeCanvas(windWidth, windHeight)
	}

	p.saveImg = () => {
		p.saveCanvas('chapmanTripp_screenshot.png')
	}

	p.playPause = () => {
		if (isPaused) {
			isPaused = false
			timeset = 10
		} else {
			isPaused = true
			timeset = 0
		}
	}

	p.reset = () => {
		colorPicker.value('#f15b2b')
		isPaused = false
		timeset = 10
		time = 0
	}
}

new p5(sketch, containerElement)
