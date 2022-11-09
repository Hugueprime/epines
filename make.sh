# !/bin/bash

if [ $1 = 'zip' ]; then
    zip -r epines.zip background content global icons popup styles manifest.json
fi

if [ $1 = 'clean' ]; then
    rm epines.zip -f
fi

if [ $1 = 'update' ]; then
    sed -i 's%v[0-9\.]*</span>%v'$2'</span>%g' popup/popup.html
    sed -i 's%\"version\": \"[0-9\.]*\"%\"version\": \"'$2'\"%g' manifest.json
fi

if [ $1 = 'version' ]; then
    grep -G "v[0-9\.]*</span>" popup/popup.html
fi
