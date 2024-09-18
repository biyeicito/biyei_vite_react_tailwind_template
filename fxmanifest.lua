fx_version "cerulean"

description "Template Vite + React + Tailwind"
author "Biyei"
version '1.0.0'

lua54 'yes'

games {
  "gta5"
}

ui_page 'web/dist/index.html'

client_scripts {
  'client/**/*',
}
server_scripts {
  'server/**/*',
}


files {
  'web/dist/**/*',
}
