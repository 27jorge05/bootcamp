#!/bin/bash

README_FILE="README.md"

MODULES=$(
    find . -maxdepth 1 -type d -name "module*" |
    sort |
    while read dir; do
        module=$(basename "$dir")
        echo "- [$module]($dir/README.md)"
    done

)


awk -v modules="$MODULES" '
/<!-- auto-generated -->/ {
    print
    print modules
    sw=1
    next
    }
/<!-- end-auto-generated -->/ {
    sw=0
}  
!sw

' "$README_FILE"> README.tmp
mv README.tmp "$README_FILE"
