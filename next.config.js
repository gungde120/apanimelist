/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "cdn.myanimelist.net"
            },
            {
                hostname: "img.youtube.com"
            },
            {
                hostname: "avatars.githubusercontent.com"
            }
        ]
    }
}

module.exports = nextConfig
