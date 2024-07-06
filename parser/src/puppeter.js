const puppeteer = require("puppeteer");

// export const LAUNCH_PUPPETEER_OPTS = {
//   ignoreHTTPSErrors: true,
//   args: [
//     "--unlimited-storage",
//     "--full-memory-crash-report",
//     "--disable-gpu",
//     "--ignore-certificate-errors",
//     "--no-sandbox",
//     "--disable-setuid-sandbox",
//     "--disable-dev-shm-usage",
//     "--lang=ru-RU;q=0.9,en;q=0.8",
//     "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
//   ],
// };

const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 1_000 * 15,
  waitUntil: "networkidle2",
  timeout: 1000 * 60 * 3,
};

class PuppeteerHandler {
  browser;
  pagePool;
  isBrowserClosed;

  constructor() {
    this.browser = null;
    this.pagePool = [];
  }

  async initBrowser() {
    this.browser = await puppeteer.launch({ headless: false });
    this.browser.on("disconnected", () => {
      console.log("Browser disconnected");
      this.isBrowserClosed = true;
      this.browser = null;
    });
  }

  async ensureBrowser() {
    if (!this.browser || this.isBrowserClosed) {
      await this.initBrowser();
      this.isBrowserClosed = false;
    }
  }

  async getPage() {
    await this.ensureBrowser();

    if (this.pagePool.length > 0) {
      return this.pagePool.pop();
    } else {
      const page = await this.browser.newPage();
      return page;
    }
  }

  async releasePage(page) {
    await page.setViewport({ width: 1920, height: 1000 });
    await page.goto("about:blank");
    this.pagePool.push(page);
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async getPageContent(url) {
    const page = await this.getPage();
    try {
      await page.goto(url, PAGE_PUPPETEER_OPTS);
      //   const content = await page.content();
      
      return { page };
    } catch (err) {
      this.releasePage(page);
      throw err;
    }
  }
}

module.exports =  new PuppeteerHandler();
