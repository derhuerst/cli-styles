'use strict'

const chalk =   require('chalk')
const figures = require('figures')
const window = require('window-size')

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
const delimiter = (completing) =>
	chalk.gray(completing ? figures.ellipsis : figures.pointerSmall)

const item = (expandable, expanded) =>
	chalk.gray(expandable ? (expanded ? figures.pointerSmall : '+') : figures.line)

module.exports = Object.freeze({
	styles,
	render,
	symbols,
	symbol,
	delimiter,
	item
})
