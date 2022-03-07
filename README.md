This is a project to re-create URL shortening service.<br/> 
For example, if we shorten the following URL:
<br/>
> <https://stackoverflow.com/questions/43580131/exec-gcc-executable-file-not-found-in-path-when-trying-go-build>

We will get:
<br/>
> <https://localhost:3030/ax5cs3>

Other than simple shortening, the API also implement rate limiting function to limit the no of request to shorten URL in a certain duration. 


## How to use

To run in production mode:
```bash
docker-compose up -d --build
```

To run in development mode:
```bash
docker-compose up -f docker-compose.dev.yml -d --build
```


## Technology used

- Golang for backend
- Redis for database
- Next.js for frontend
