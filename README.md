# polyfill
自建polyfill服务器

# 使用方法
```
git clone git@github.com:wuyxp/polyfill.git
cd polyfill
yarn
yarn start
```
访问
http://localhost:3344/polyfill.min.js?features=Array.from


# 项目说明书
https://www.yuque.com/docs/share/2b78107a-bba6-44c5-90bc-55eb27b549ff

# nginx配置

```
proxy_cache_path /data/nginx/cache/polyfill keys_zone=polyfill:10m use_temp_path=off;
server {
    listen 80;
    server_name test.com;
    location ~ ^/polyfill.*\.js {
      proxy_cache polyfill;
      proxy_cache_key "$request_uri$http_user_agent";
      proxy_ignore_headers Cache-Control;
      proxy_cache_min_uses 1;
      proxy_cache_valid  200 206 304 301 302 1y;
      add_header X-Cache-Status $upstream_cache_status;  #添加此行
      proxy_pass http://127.0.0.1:3344;
    }
}
```