/** @type {import('next').NextConfig} */
const nextConfig = {webpack: (config, options) => {
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
},};

export default nextConfig;
