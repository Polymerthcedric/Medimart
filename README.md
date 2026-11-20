# Medimart storefront prototype

A React demo for browsing medical-supply listings, creating an account, and trying the checkout flow. The chat helper uses scripted responses, and M-Pesa payments are for sandbox testing. This is not a live shop or medical service.

## Run locally

```sh
npm install
npm start
```

If peer-dependency resolution fails (React 19 with react-scripts 5), use `npm install --legacy-peer-deps` — the deploy workflow does the same.

The demo calls the hosted Flask API at `https://polymerthcedric.pythonanywhere.com` by default. Set `REACT_APP_API_URL` to point at your own backend before building. See the [backend project](https://github.com/Polymerthcedric/medimart-backend) for its setup.

Demo limitation: the checkout sends the displayed item price from the browser, and the backend does not recompute it. Do not use this flow for real payments.
