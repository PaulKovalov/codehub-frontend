envsubst '\$API_URL \$GOOGLE_TAG \$MIN_ARTICLE_LENGTH \$MAX_ARTICLE_LENGTH' < /usr/share/code-hub/app-config.json.in > /usr/share/nginx/html/app-config.json
nginx -g "daemon off;"
