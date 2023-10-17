/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/protected',
                destination: '/login',
                permanent: false
            }
        ]
    }
}

module.exports = nextConfig
