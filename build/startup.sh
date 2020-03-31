envsubst '\$API_URL' < /usr/share/code-hub/app-config.json.in > /usr/share/nginx/html/app-config.json
nginx -g "daemon off;"
