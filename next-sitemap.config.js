/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://heshanithennakoon.com',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*'], // Exclude admin routes from indexing
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/admin', '/admin/*'],
      },
    ],
  },
};
