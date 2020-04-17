envsubst '\$API_URL \$GOOGLE_TAG' < /usr/share/code-hub/app-config.json.in > /usr/share/nginx/html/app-config.json
nginx -g "daemon off;"
