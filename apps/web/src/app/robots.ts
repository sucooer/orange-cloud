import type { MetadataRoute } from "next";

// AI 爬虫分级策略（GEO）：
// - 放行：搜索/检索爬虫（决定能否出现在 AI 搜索结果里）与用户触发爬虫
//   （用户把链接贴进对话时抓取页面）。
// - 屏蔽：训练爬虫（内容不进训练语料，不影响 AI 搜索）与不守规矩的未声明爬虫。
// - Google-Extended / Applebot-Extended 是退出 AI 训练的声明标识，非真实爬虫。
const SEARCH_AND_USER_BOTS = [
	"OAI-SearchBot",
	"ChatGPT-User",
	"Claude-SearchBot",
	"Claude-User",
	"PerplexityBot",
	"Perplexity-User",
];

const TRAINING_AND_ROGUE_BOTS = [
	"GPTBot",
	"ClaudeBot",
	"Meta-ExternalAgent",
	"CCBot",
	"Google-Extended",
	"Applebot-Extended",
	"Bytespider",
];

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			...SEARCH_AND_USER_BOTS.map((userAgent) => ({
				userAgent,
				allow: "/",
				disallow: "/oauth/",
			})),
			...TRAINING_AND_ROGUE_BOTS.map((userAgent) => ({
				userAgent,
				disallow: "/",
			})),
			{ userAgent: "*", allow: "/", disallow: "/oauth/" },
		],
		sitemap: "https://orange-cloud.chatiro.app/sitemap.xml",
	};
}
