/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.txt/i,
            use: [
                {
                    loader: "raw-loader",
                    options: {
                        esModule: false,
                    },
                },
            ],
        });
        return config;
    },
    images : {
            domains: ['ddragon.leagueoflegends.com'],
    },
    pageExtensions: isProd ? ['tsx', 'ts', 'js', 'jsx'] : ['tsx', 'ts', 'js', 'jsx', 'dev.js'], 
};

export default nextConfig;
