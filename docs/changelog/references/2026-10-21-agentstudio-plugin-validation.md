# Agent Studio plugin validation

The 0.2.0 draft uses the source checks below in addition to the skill and client validators. The original 21 checks missed a renamed skill and broken manifest-declared skill roots; four additions parse the skill name and follow the three clients' declared/default roots. The reference-tree update replaces the superseded single-file assertion with required-file, conditional-caller, containment and reachability checks. This command checks pending provenance against its explicit base, not the checkout's moving `HEAD`.

Run from the repository root:

```sh
ruby -e 'text=File.read(ARGV.fetch(0)); source=text[/^```ruby\n(.*?)^```$/m,1] or abort("Ruby check block missing"); eval(source, TOPLEVEL_BINDING, ARGV[0])' docs/changelog/references/2026-10-21-agentstudio-plugin-validation.md
```

```ruby
require 'json'
checks=[]
check=->(name,result){raise name unless result; checks << name}
base='e34ad3f8b1a97458c8ed5e119869432334321e22'
root='plugins/agentstudio'
%w[claude codex cursor].each {|client| d=JSON.parse(File.read("#{root}/.#{client}-plugin/plugin.json"));check.call("#{client} manifest version/name",d['name']=='agentstudio'&&d['version']=='0.2.0')}
%w[.agents/plugins/marketplace.json .claude-plugin/marketplace.json .cursor-plugin/marketplace.json].each do |path|
 d=JSON.parse(File.read(path));old=JSON.parse(IO.popen(['git','show',base+':'+path], &:read));entries=d['plugins'].select{|e|e['name']=='agentstudio'}
 check.call(path+' preserves old entries',d.merge('plugins'=>d['plugins'].reject{|e|e['name']=='agentstudio'})==old)
 check.call(path+' unique version',entries.size==1&&entries[0]['version']=='0.2.0')
 source=entries[0]['source'];source=source['path'] if source.is_a?(Hash)
 resolved=path.start_with?('.cursor') ? File.join(d['metadata']['pluginRoot'],source) : source
 check.call(path+' resolves skill',File.file?(File.join(resolved,'skills/agentstudio/SKILL.md')))
end
p=JSON.parse(File.read('plugin-sources.json'));old=JSON.parse(IO.popen(['git','show',base+':plugin-sources.json'], &:read));check.call('previous provenance unchanged',p.merge('skills'=>p['skills'].reject{|k,v|k=='agentstudio'})==old)
s=p['skills']['agentstudio'];check.call('honest pending pin',s['status']=='pending'&&s['commit'].nil?&&s['baselineCommit'].match?(/\A[0-9a-f]{40}\z/))
check.call('canonical vendor paths',s['sourcePath']=='Sources/AgentStudio/Resources/AgentPackage/skills/agentstudio'&&s['destinationPath']==root+'/skills/agentstudio')
yaml=File.read(root+'/skills/agentstudio/agents/openai.yaml');check.call('Codex UI metadata',yaml.include?('$agentstudio')&&yaml[/short_description: "([^"]+)"/,1].size.between?(25,64))
check.call('no executable resources',Dir.glob(root+'/**/{hooks,scripts}').empty?)
skill_root = File.join(root, 'skills/agentstudio')
body = File.read(File.join(skill_root, 'SKILL.md'))
required_references = %w[worktrees pane-communication pane-context commands-and-ipc panes-and-terminals worktree-recovery recovery].map { |name| "references/#{name}.md" }
check.call('required runtime reference files exist', required_references.all? { |path| File.file?(File.join(skill_root, path)) })
callers = body.lines.grep(/^- IF .+, load `references\/[^`]+\.md` and return .+\.\s*$/)
called_paths = callers.flat_map { |line| line.scan(/`(references\/[^`]+\.md)`/).flatten }
check.call('complete conditional callers match required references', called_paths.sort == required_references.sort && called_paths.uniq.size == called_paths.size)
runtime_files = ['SKILL.md'] + Dir.glob(File.join(skill_root, 'references/**/*.md')).map { |path| path.delete_prefix(skill_root + '/') }
edges = runtime_files.to_h do |path|
  text = File.read(File.join(skill_root, path))
  references = text.scan(/`((?:\.\.\/|\.\/)?references\/[^`]+\.md)`/).flatten
  references += text.scan(/\]\(((?:\.\.\/|\.\/)[^)]+\.md)\)/).flatten
  [path, references.map { |reference| File.expand_path(reference, File.dirname(File.join(skill_root, path))) }]
end
canonical_root = File.realpath(skill_root) + '/'
check.call('local reference calls resolve inside skill', edges.values.flatten.all? { |path| File.file?(path) && File.realpath(path).start_with?(canonical_root) })
reachable = []
pending = [File.expand_path(File.join(skill_root, 'SKILL.md'))]
until pending.empty?
  current = pending.shift
  next if reachable.include?(current)
  reachable << current
  relative = current.delete_prefix(File.expand_path(skill_root) + '/')
  pending.concat(edges.fetch(relative, []))
end
actual_references = runtime_files.reject { |path| path == 'SKILL.md' }
check.call('runtime references have no orphans', actual_references.all? { |path| reachable.include?(File.expand_path(File.join(skill_root, path))) })
catalog=File.read('plugins/README.md');check.call('catalog client IDs',catalog.lines.count{|l|l.start_with?('Codex ','Claude Code ')&&l.include?('agentstudio@sunstack')}==2)
check.call('catalog README link',catalog.include?('[plugin README](agentstudio/README.md)')&&File.file?('plugins/agentstudio/README.md'))
check.call('catalog Cursor and draft limits',catalog.include?('including agent-router and agentstudio')&&catalog.include?('upstream pin remains pending'))
require 'yaml'
canonical_skill = File.join(root, 'skills/agentstudio/SKILL.md')
frontmatter = File.read(canonical_skill).match(/\A---\r?\n(.*?)\r?\n---(?:\r?\n|\z)/m)
skill_metadata = frontmatter && YAML.safe_load(frontmatter[1], permitted_classes: [], permitted_symbols: [], aliases: false)
check.call('skill frontmatter name matches agentstudio', skill_metadata.is_a?(Hash) && skill_metadata['name'] == 'agentstudio')
%w[claude codex cursor].each do |client|
 manifest = JSON.parse(File.read("#{root}/.#{client}-plugin/plugin.json"))
 declaration = manifest['skills']
 declaration = './skills/' if declaration.nil? && client == 'claude'
 skill_roots = declaration.is_a?(String) ? [declaration] : declaration
 resolves_canonical_skill = skill_roots.is_a?(Array) && !skill_roots.empty? &&
   skill_roots.all? { |skill_root| skill_root.is_a?(String) } &&
   skill_roots.any? do |skill_root|
     candidate = File.expand_path(File.join(skill_root, 'agentstudio/SKILL.md'), root)
     File.file?(candidate) && File.realpath(candidate) == File.realpath(canonical_skill)
   end
 check.call("#{client} declared/default skill root resolves canonical skill", resolves_canonical_skill)
end

puts JSON.pretty_generate({passed:checks.size,failed:0,checks:checks})
```

The root assertions resolve current Codex/Cursor declarations and Claude's explicit declaration or implicit `./skills/` default to the canonical skill file. Quoted YAML names and normalized equivalent paths remain allowed. The reference assertions require the seven accepted teaching files and complete distinct callers, resolve local reference paths inside the skill, and reject unreachable reference files. This checks the declared source layout; installed tree inclusion and behavior require separate observations.

Sensitivity checks use an isolated copy, restore each file, and require nonzero exit for each of: a renamed skill, a missing declared skill root in each client manifest, a wrong plugin name, a missing marketplace source in each client, a removed marketplace entry, a missing required reference, a broken conditional reference path, and an orphan reference file. Keep a positive control with a quoted `agentstudio` name and equivalent skill-root spelling. These deliberate mutations test assertion sensitivity; they do not establish a defect in the unmodified package or tests-first order. The oracle is the accepted seven-reference spec and the three declared/default package roots; the checks read the actual files/manifests, not a second hardcoded output report.

Other gates are `uv run --with pyyaml python <skill-creator>/scripts/quick_validate.py plugins/agentstudio/skills/agentstudio`, `claude plugin validate plugins/agentstudio --json`, `claude plugin validate . --json`, and committed-diff whitespace validation. Default Claude manifest validation is separate from directory submission; the latter's license/icon diagnostics and unrelated marketplace README advisories do not establish local installation failure.

Prior 0.1.0 disposable-home observations are separate evidence: Claude Code 2.1.306 installed and discovered `agentstudio:agentstudio`; Codex CLI 0.163.0 installed matching SKILL.md bytes, with discovered-skill inventory blocked by authentication. Cursor authentication blocked its marketplace observation. Claude displayed both loose `agentstudio` and plugin-qualified `agentstudio:agentstudio` copies; automatic choice and precedence remain unobserved. These observations do not establish delivery of the new reference tree. App behavior, recursive app installation, full upstream runtime-tree equality/pin and the joint release remain outside these checks.
