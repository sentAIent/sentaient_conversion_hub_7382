import re

with open('lim_clone/backend_go/alpaca.go', 'r') as f:
    content = f.read()

new_init = """func InitAlpaca() {
	// Explicitly configure paper vs live URL based on environment
	baseURL := "https://api.alpaca.markets" // LIVE by default
	isPaper := os.Getenv("ALPACA_IS_PAPER")
	if isPaper == "true" {
		baseURL = "https://paper-api.alpaca.markets"
	}

	opts := alpaca.ClientOpts{
		BaseURL: baseURL,
	}

	alpacaClient = alpaca.NewClient(opts)

	// Test the connection by getting the account
	_, err := alpacaClient.GetAccount()
	if err != nil {
		log.Printf("Alpaca initialization warning (keys might not be set yet): %v", err)
		alpacaClient = nil
		return
	}
	log.Printf("Alpaca initialized successfully! (Paper mode: %v)", isPaper == "true")
}"""

content = re.sub(r'func InitAlpaca\(\) \{.*?\n	\}', new_init, content, flags=re.DOTALL)

with open('lim_clone/backend_go/alpaca.go', 'w') as f:
    f.write(content)
