FROM nginx:alpine

COPY dist/pizarra-client/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
