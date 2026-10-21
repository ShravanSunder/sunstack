# Agent Studio plugin validation

The 0.1.0 draft uses these 25 source checks in addition to the skill and client validators. The original 21 checks missed a renamed skill and broken manifest-declared skill roots; the four additions parse the skill name and follow the three clients' declared/default roots. This command checks this draft's pending provenance against its explicit base, not the checkout's moving `HEAD`.

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
%w[claude codex cursor].each {|client| d=JSON.parse(File.read("#{root}/.#{client}-plugin/plugin.json"));check.call("#{client} manifest version/name",d['name']=='agentstudio'&&d['version']=='0.1.0')}
%w[.agents/plugins/marketplace.json .claude-plugin/marketplace.json .cursor-plugin/marketplace.json].each do |path|
 d=JSON.parse(File.read(path));old=JSON.parse(IO.popen(['git','show',base+':'+path], &:read));entries=d['plugins'].select{|e|e['name']=='agentstudio'}
 check.call(path+' preserves old entries',d.merge('plugins'=>d['plugins'].reject{|e|e['name']=='agentstudio'})==old)
 check.call(path+' unique version',entries.size==1&&entries[0]['version']=='0.1.0')
 source=entries[0]['source'];source=source['path'] if source.is_a?(Hash)
 resolved=path.start_with?('.cursor') ? File.join(d['metadata']['pluginRoot'],source) : source
 check.call(path+' resolves skill',File.file?(File.join(resolved,'skills/agentstudio/SKILL.md')))
end
p=JSON.parse(File.read('plugin-sources.json'));old=JSON.parse(IO.popen(['git','show',base+':plugin-sources.json'], &:read));check.call('previous provenance unchanged',p.merge('skills'=>p['skills'].reject{|k,v|k=='agentstudio'})==old)
s=p['skills']['agentstudio'];check.call('honest pending pin',s['status']=='pending'&&s['commit'].nil?&&s['baselineCommit'].match?(/\A[0-9a-f]{40}\z/))
check.call('canonical vendor paths',s['sourcePath']=='Sources/AgentStudio/Resources/AgentPackage/skills/agentstudio'&&s['destinationPath']==root+'/skills/agentstudio')
yaml=File.read(root+'/skills/agentstudio/agents/openai.yaml');check.call('Codex UI metadata',yaml.include?('$agentstudio')&&yaml[/short_description: "([^"]+)"/,1].size.between?(25,64))
check.call('no executable resources',Dir.glob(root+'/**/{hooks,scripts}').empty?)
check.call('single-file runtime',!File.read(root+'/skills/agentstudio/SKILL.md').include?('references/'))
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

The correct draft yields `passed: 25`, `failed: 0`, exit 0. The root assertions resolve the current Codex/Cursor declarations and Claude's explicit declaration or implicit `./skills/` default to the actual canonical skill file. Quoted YAML names and normalized equivalent paths remain allowed. This is a check of this package's declared layout, not a general plugin validator or an installed discovery test.

Sensitivity checks use an isolated copy, restore each file, and require nonzero exit for each of: a renamed skill, a missing declared skill root in each client manifest, a wrong plugin name, a missing marketplace source in each client, and a removed marketplace entry. Keep a positive control with a quoted `agentstudio` name and equivalent skill-root spelling. These deliberate mutations test assertion sensitivity; they do not establish a defect in the unmodified package or tests-first order.

Other gates are `uv run --with pyyaml python <skill-creator>/scripts/quick_validate.py plugins/agentstudio/skills/agentstudio`, `claude plugin validate plugins/agentstudio --json`, `claude plugin validate . --json`, and committed-diff whitespace validation. Default Claude manifest validation is separate from directory submission; the latter's license/icon diagnostics and unrelated marketplace README advisories do not establish local installation failure.

Disposable-home observations are separate evidence: Claude Code 2.1.306 installed and discovered `agentstudio:agentstudio`; Codex CLI 0.163.0 installed matching skill bytes, with discovered-skill inventory blocked by authentication. Cursor authentication blocked its marketplace observation. Claude displayed both loose `agentstudio` and plugin-qualified `agentstudio:agentstudio` copies; automatic choice and precedence remain unobserved. App behavior, upstream byte equality/pin and the joint release remain outside these checks.
