# ------------------------------------
# ALIASES
# ------------------------------------
# Aliases for (1) quickly opening this file and (2) have terminal recognize changes to this file
alias bashedit='edit ~/.bash_profile'
alias bashrefresh='source ~/.bash_profile'

# Example alias for SSH'ing into a server
alias myserver="ssh user@111.111.111.111"

# Example alias for quickly getting to a commonly used directory
alias htdocs='cd /Applications/MAMP/htdocs'

# sudo ln -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/sublime

# ------------------------------------
# Append to PATH
# ------------------------------------
export PATH="/Applications/MAMP/bin/php/php5.5.14/bin":$PATH
export PATH="/Users/Susan/Library/Application Support/GoodSync":$PATH

# Regular Colors
Black='\[\e[0;30m\]'        # Black
Red='\[\e[0;31m\]'          # Red
Green='\[\e[0;32m\]'        # Green
Yellow='\[\e[0;33m\]'       # Yellow
Blue='\[\e[0;34m\]'         # Blue
Purple='\[\e[0;35m\]'       # Purple
Cyan='\[\e[0;36m\]'         # Cyan
White='\[\e[0;37m\]'        # White
Light_Gray='\[\033[0;37m\]'

# Bold
BBlack='\[\e[1;30m\]'       # Black
BRed='\[\e[1;31m\]'         # Red
BGreen='\[\e[1;32m\]'       # Green
BYellow='\[\e[1;33m\]'      # Yellow
BBlue='\[\e[1;34m\]'        # Blue
BPurple='\[\e[1;35m\]'      # Purple
BCyan='\[\e[1;36m\]'        # Cyan
BWhite='\[\e[1;37m\]'       # White
BLight_Gray='\[\033[1;37m\]'

# High Intensity
IBlack='\[\e[0;90m\]'       # Black
IRed='\[\e[0;91m\]'         # Red
IGreen='\[\e[0;92m\]'       # Green
IYellow='\[\e[0;93m\]'      # Yellow
IBlue='\[\e[0;94m\]'        # Blue
IPurple='\[\e[0;95m\]'      # Purple
ICyan='\[\e[0;96m\]'        # Cyan
IWhite='\[\e[0;97m\]'       # White

# Bold High Intensity
BIBlack='\[\e[1;90m\]'      # Black
BIRed='\[\e[1;91m\]'        # Red
BIGreen='\[\e[1;92m\]'      # Green
BIYellow='\[\e[1;93m\]'     # Yellow
BIBlue='\[\e[1;94m\]'       # Blue
BIPurple='\[\e[1;95m\]'     # Purple
BICyan='\[\e[1;96m\]'       # Cyan
BIWhite='\[\e[1;97m\]'      # White

# Reset colors
NONE="\[\e[0m\]"




# ------------------------------------
# Functions used in the prompt
# ------------------------------------
function parse_git_branch {
    git branch 2>/dev/null | grep '^*' | sed 's_^..__' | sed 's_\(.*\)_(\1)_'
}

function git_dirty {
    git diff --quiet HEAD &>/dev/null
    [ $? == 1 ] && echo "!"
}




# ------------------------------------
# Configure prompt
# ------------------------------------
# delimiters between prompt components (like :@) are your default terminal text color, i.e. white

# Variables

# prompt components, set colors here using names from above. 
# Some alternate colors are commented out as examples.
ps1_user="$BIBlue\u$NONE"
#ps1_user="$Blue\u$NONE" # non-intense, non bold blue username

ps1_host="$IGreen\h$NONE"

ps1_dir="$BIYellow\w$NONE"
#ps1_dir="$BICyan\w$NONE" # cyan for dir name, still bold and intense

ps1_git="$Yellow\$(parse_git_branch)$Red\$(git_dirty)$NONE"
#ps1_git="$Cyan\$(parse_git_branch)$Red\$(git_dirty)$NONE" # cyan branch name

# Option 1 user@host:dir(branch)! $
# export PS1="${ps1_user}@${ps1_host}:${ps1_dir}${ps1_git} \$ "

# Option 2 dir(branch)! $
export PS1="${ps1_dir}${ps1_git} \$ "


