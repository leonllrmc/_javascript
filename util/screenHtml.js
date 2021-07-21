const puppeteer = require('puppeteer')

/** 
 * @async
 * @param { string } url 
 * @param { object } param1 
 * @param { 'image' | 'pdf' } [param1.type] 
 * @param { { width: number, height: number } } [param1.view] 
 * @param { string } [param1.path] 
 * @example
 * await screenHtlm(url) // Give screen of HTML page
 * await screenHtml(url, { type: 'pdf' }) // Give a pdf of HTML page
 * @returns Promise<string | Buffer>
 */
async function screenHtml (url, { type = 'image', view = { width: 1920, height: 1080 }, path } = {}) {
	try {
		if (typeof url !== 'string') throw TypeError('url must be a string')
		const browser = await puppeteer.launch({ defaultViewport: view })
		const page = await browser.newPage()
		await page.goto(url)
		const result = type === 'image' ? await page.screenshot({ fullPage: true, type: 'png', path }) : type === 'pdf' ? await page.pdf({ path, format: 'a4' }) : null
		
		return result
	}finally {
		await browser.close()
	}
}
