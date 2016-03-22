'use strict'

const chalk =   require('chalk')
const figures = require('figures')



// For showing the user's input.
const styles = Object.freeze({
	password:  (input) => '*'.repeat(input.length),
	invisible: (input) => '',
	default:   (input) => input
})
const render = (type) => styles[type] || styles.default

// An icon to signalize a prompt.
const symbols = Object.freeze({
	aborted: chalk.red(figures.cross),
	done:    chalk.green(figures.tick),
	default: chalk.cyan('?')
})
const symbol = (done, aborted) =>
	aborted ? symbols.aborted : (done ? symbols.done : symbols.default)

// Between the question and the user's input.
const delimiter = chalk.gray(figures.pointerSmall)



// Determine the type of a keypress event.
const keypress = function (raw, key) {
	if (!key) key = {
		name:     raw.toLowerCase(),
		sequence: raw,
		ctrl: false, meta: false, shift: false
	}
	let code; if (raw) code = raw.charCodeAt(0)

	if (key.ctrl) {
		if (key.name === 'a')     return 'first'
		if (key.name === 'c')     return 'abort'
		if (key.name === 'd')     return 'abort'
		if (key.name === 'e')     return 'last'
	}
	if (key.name === 'return')    return 'submit'
	if (key.name === 'backspace') return 'delete'
	if (key.name === 'abort')     return 'abort'
	if (key.name === 'escape')    return 'abort'

	if (key.name === 'up')        return 'up'
	if (key.name === 'down')      return 'down'
	if (key.name === 'right')     return 'right'
	if (key.name === 'left')      return 'left'
	if (code === 8747)            return 'left'  // alt + B
	if (code === 402)             return 'right' // alt + F

	return key.sequence
}



module.exports = Object.freeze({
	styles,
	render,
	symbols,
	symbol,
	delimiter,
	keypress
})
