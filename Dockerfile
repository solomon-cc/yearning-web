FROM nginx:1.18-alpine

RUN rm -f /etc/nginx/nginx.conf \
    && mkdir /data 

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /data

WORKDIR /data

RUN chmod +x entrypoint.sh
ENTRYPOINT ["/data/entrypoint.sh"]
CMD ["nginx"]

