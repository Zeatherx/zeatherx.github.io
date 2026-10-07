import { copyFileSync, mkdirSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
mkdirSync('dist/Terminal', { recursive: true })
copyFileSync('dist/index.html', 'dist/Terminal/index.html')