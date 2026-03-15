/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
	turbopack: {
		rules: {
			'*.txt': {
				loaders: ['raw-loader'],
			}
		}
	},
    images : {
        remotePatterns: [new URL('http://ddragon.leagueoflegends.com/**')],
    },
    pageExtensions: isProd ? ['tsx', 'ts', 'js', 'jsx'] : ['tsx', 'ts', 'js', 'jsx', 'dev.js'], 
};

export default nextConfig;