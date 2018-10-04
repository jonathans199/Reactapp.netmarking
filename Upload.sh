rm -rf build/
npm run build -p
rsync -azP build/* root@185.39.11.13:/usr/share/nginx/asoftio/clients/netmarketcap/app
