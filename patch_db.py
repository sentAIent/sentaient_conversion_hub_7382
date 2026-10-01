with open('lim_clone/backend_go/db.go', 'r') as f:
    content = f.read()

content = content.replace('"127.0.0.1:9000"', 'getClickhouseHost()')
content = content.replace('package main\n\nimport (\n\t"context"\n\t"fmt"\n\t"time"', 'package main\n\nimport (\n\t"context"\n\t"fmt"\n\t"os"\n\t"time"')

func_to_add = """
func getClickhouseHost() string {
	host := os.Getenv("CLICKHOUSE_HOST")
	if host == "" {
		return "127.0.0.1:9000"
	}
	return host
}
"""

if 'func getClickhouseHost' not in content:
    content += func_to_add

with open('lim_clone/backend_go/db.go', 'w') as f:
    f.write(content)
