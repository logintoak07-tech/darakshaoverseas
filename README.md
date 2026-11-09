# Daraksha Overseas LLP Website

A static, single-page B2B recruitment website built with plain HTML, CSS and JavaScript.

## Publish on GitHub Pages
1. Create a new GitHub repository, for example `daraksha-overseas`.
2. Upload everything inside this folder to the repository root. Keep the `assets` and `images` folders intact.
3. In GitHub, open **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then click **Save**.
6. GitHub will provide a public `https://<username>.github.io/<repository>/` address after deployment.

## Custom domain and DNS
1. In **Settings > Pages > Custom domain**, enter your domain, for example `www.example.com`, and save. GitHub creates a `CNAME` file.
2. At your DNS provider, create a `CNAME` record: Host `www`, Value `<username>.github.io`.
3. For the apex domain, create these GitHub Pages `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
4. Optional IPv6 `AAAA` records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
5. DNS propagation may take up to 24–48 hours. After DNS resolves, return to **Settings > Pages** and enable **Enforce HTTPS**.

## Configure contact details and form
Edit `assets/js/config.js`. Empty phone, email and hours values stay hidden.
- `phone`: displayed and linked as a telephone number.
- `email`: displayed and used as the mailto fallback.
- `address`: headquarters or office address.
- `hours`: office hours.
- `formEndpoint`: Formspree or Web3Forms endpoint that accepts JSON.

If `formEndpoint` is blank and `email` is set, submission opens the visitor's email app. If both are blank, the form explains that contact configuration is pending.

## Edit content later
- Main page content: `index.html`
- Colours, layout and responsive rules: `assets/css/style.css`
- Menu, counters, animation and form logic: `assets/js/main.js`
- Contact settings: `assets/js/config.js`
- Images: replace files in `images/` using the same filenames, or update the paths in `index.html`. Keep WebP photos around 1400px wide and below roughly 150 KB.

## Testing completed
- Responsive viewport checks: 390 × 844 and 1366 × 768.
- Checked for horizontal overflow.
- Checked JavaScript syntax and page load console errors.
- Keyboard-accessible navigation, labels and form fields included.
- Reduced-motion preference supported.

## Notes
All business facts were drawn from the supplied prospectus. Phone, email, office hours and the form endpoint remain intentionally blank until confirmed.
