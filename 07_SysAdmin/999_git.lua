--- The following get_ functions are helpers for git_prompt_filter()

---
 -- Find out current branch
 -- @return {false|git branch name}
---
function get_git_branch()
    for line in io.popen("git branch 2>nul"):lines() do
        local m = line:match("%* (.+)$")
        if m then
            return m
        end
    end

    return false
end




---
 -- Get the status of working dir
 -- @return {bool}
---
-- function get_git_status()
--    results = os.execute("git diff --quiet --ignore-submodules HEAD")
--    return results
-- end

---
 -- Get status of working dir
 -- @return {bool}
---
function get_git_dirty()
    -- --quiet makes sure we don't see output in the command
    -- returns true if there are no differences
    -- returns false if there are differences
    results = os.execute("git diff --quiet HEAD")
    return results
end




-- Customize what the prompt looks like when you're in a git directory
function git_prompt_filter()

    -- Colors for git status
    local colors = {
        clean = "\x1b[1;37;40m",
        dirty = "\x1b[31;1m",
    }

    local branch = get_git_branch()
    if branch then
        -- Has branch => therefore it is a git folder, now figure out status

        if get_git_dirty() then
            color = colors.clean
            character = ''
        else
            color = colors.dirty
            character = '!'
        end

        clink.prompt.value = string.gsub(clink.prompt.value, "{git}", color.."("..branch..")"..character)
        return true
    end

    -- No git present or not in git file
    clink.prompt.value = string.gsub(clink.prompt.value, "{git}", "")
    return false
end

clink.prompt.register_filter(git_prompt_filter, 50)