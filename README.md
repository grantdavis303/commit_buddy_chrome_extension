# Commit Buddy Chrome Extension

### [See Commit Buddy in the Chrome Web Store](https://chromewebstore.google.com/detail/commit-buddy/jfidkngbdohmegijjkggecihaokmcgof?authuser=0&hl=en)

A Chrome extension that simplifies Git workflows by letting developers write and save commit messages in the browser.

## Local Setup

1. Clone & Navigate to Repo

```
git@github.com:grantdavis303/commit_buddy_chrome_extension.git
cd commit_buddy_chrome_extension
```

2. Install Dependencies

```
npm install
```

3. Run Build

```
npm run build
```

4. Navigate to `chrome://extensions/` in the Chrome Browser

5. In the top-right corner, enable "Developer Mode"

6. Click "Load Unpacked"

7. Select the `dist` folder inside `commit_buddy_chrome_extension`

    - You should see the extension popup in the "All Extensions" section with a description and icon.

8. Pin the Extension (optional)

    - Click the puzzle piece icon in the browser to the right of the search bar.
    - Find "Commit Buddy" in the list.
    - Click the pin icon to pin it.
    - Click on the Commit Buddy logo to open Commit Buddy.
