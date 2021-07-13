# Antibot Agent
## Requirements
- Node (tested on v16.4.2)
- Npm (tested on 7.18.1)
- Python3 (test server)

## Build
```bash
make install
make build
```

## Usage
Run antibot backend, then run:  
```bash
make run
```
Open in your browser (with dev console):  
```
http://localhost:8080
```
You should see in the console:  
```json
{status: "success", data: "anything"}
```
