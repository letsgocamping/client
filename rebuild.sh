if [ "$1" == "nocontainer" ]; then
  echo "Starting new container.."
else
  echo "Restarting container.."
  docker stop lgc-client && docker rm lgc-client
fi
docker build -t lgc-client . && docker run --name lgc-client -v /var/www/:/usr/src/app/client/dist/ -d lgc-client
