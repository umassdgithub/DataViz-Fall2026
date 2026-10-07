# Mapbox Token Setup

The Deck.gl/Mapbox examples require a Mapbox access token to display the basemap.

## Getting Your Token

1. Go to [Mapbox Sign Up](https://account.mapbox.com/auth/signup/)
2. Create a free account (or sign in if you have one)
3. Navigate to your [Account Tokens](https://account.mapbox.com/tokens/)
4. Copy your **Default Public Token** (it starts with `pk.`)

## Adding Your Token

Replace `YOUR_MAPBOX_PUBLIC_TOKEN_HERE` in each example's `token.js` file with your public token:

```javascript
let token = "pk.YOUR_TOKEN_HERE";
```

The token must be a **public token** (starts with `pk.`), not a secret token.

## Examples that need a token:
- Example 1: `Example 1/token.js`
- Example 2: `Example 2/token.js`
- Example 3: `Example 3/token.js`
- Example 4: `Example 4/tokens.js`

Once you've added your token, the examples should work in your browser!
